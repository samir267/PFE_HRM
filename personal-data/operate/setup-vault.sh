#!/bin/bash
# Clean up old Vault
docker stop vault 2>/dev/null || true
docker rm vault 2>/dev/null || true

# Start Vault in dev mode with explicit root token
docker run -d --name vault -p 8200:8200 hashicorp/vault:1.15.6 server -dev -dev-root-token-id=root
echo "Waiting for Vault to initialize..."
sleep 5

# Set Vault vars
export VAULT_TOKEN="root"
export VAULT_ADDR="http://localhost:8200"

# Use existing ENCRYPTION_KEY if present, otherwise generate new
if [ -f ../.env.dev ] && grep -q "ENCRYPTION_KEY" ../.env.dev; then
  export ENCRYPTION_KEY=$(grep "ENCRYPTION_KEY" ../.env.dev | cut -d'=' -f2)
else
  export ENCRYPTION_KEY=$(openssl rand -hex 32)
fi

# Generate encrypted values
echo "Generating encrypted secrets..."
DB_PASS_ENCRYPTED=$(ENCRYPTION_KEY=$ENCRYPTION_KEY ../node_modules/.bin/ts-node -e "
  const { encrypt } = require('../src/utils/secrets.utils');
  console.log(encrypt('password'));
" 2>/dev/null) || {
  echo "Error: Failed to encrypt DB password with ts-node"
  exit 1
}

JWT_SECRET_ENCRYPTED=$(ENCRYPTION_KEY=$ENCRYPTION_KEY ../node_modules/.bin/ts-node -e "
  const { encrypt } = require('../src/utils/secrets.utils');
  console.log(encrypt('5c33d8e4e3d2bfdb338213ae3f615904'));
" 2>/dev/null) || {
  echo "Error: Failed to encrypt JWT secret with ts-node"
  exit 1
}

# Store secrets in Vault
echo "Storing secrets in Vault..."
docker exec -e VAULT_ADDR=$VAULT_ADDR -e VAULT_TOKEN=$VAULT_TOKEN vault \
  vault kv put -mount=secret myapp \
    db_url="mongodb://localhost:27017/" \
    db_name="base_msrv" \
    db_user="admin" \
    db_password_encrypted="$DB_PASS_ENCRYPTED" \
    jwt_secret_encrypted="$JWT_SECRET_ENCRYPTED" || {
  echo "Error: Failed to store secrets in Vault"
  exit 1
}

# Append Vault variables to .env.dev if they don't exist
echo "Updating ../.env.dev with Vault variables if not present..."
[ ! -f ../.env.dev ] && touch ../.env.dev  # Create .env.dev in project root if it doesn’t exist
grep -q "^VAULT_ENDPOINT=" ../.env.dev || echo "VAULT_ENDPOINT=$VAULT_ADDR" >> ../.env.dev
grep -q "^VAULT_TOKEN=" ../.env.dev || echo "VAULT_TOKEN=$VAULT_TOKEN" >> ../.env.dev
grep -q "^ENCRYPTION_KEY=" ../.env.dev || echo "ENCRYPTION_KEY=$ENCRYPTION_KEY" >> ../.env.dev
grep -q "^USE_VAULT=" ../.env.dev || echo "USE_VAULT=true" >> ../.env.dev  # Ensure USE_VAULT is set
chmod 0600 ../.env.dev

echo -e "\n✅ Vault Setup Complete!"
echo -e "🔑 Vault Token: $VAULT_TOKEN"
echo -e "🔐 Encryption Key: $ENCRYPTION_KEY"
echo -e "🌐 Vault UI: http://localhost:8200/ui"
echo -e "\nRun your application with: npm run dev"