#!/bin/bash
# wait-for-it.sh: Wait for a service to be available
# Usage: ./wait-for-it.sh host:port [-t timeout] [-- command args]

host="$1"
port="${host#*:}"
host="${host%:*}"
shift
cmd="$@"

TIMEOUT=15
QUIET=0

while getopts ":t:q" opt; do
  case $opt in
    t) TIMEOUT="$OPTARG" ;;
    q) QUIET=1 ;;
    *) echo "Usage: $0 host:port [-t timeout] [-- command args]" >&2; exit 1 ;;
  esac
done

echo "Waiting for $host:$port..."
start_time=$(date +%s)
while ! nc -z "$host" "$port" 2>/dev/null; do
  current_time=$(date +%s)
  elapsed=$((current_time - start_time))
  
  if [ $elapsed -ge $TIMEOUT ]; then
    echo "Timeout reached after ${TIMEOUT}s waiting for $host:$port" >&2
    exit 1
  fi
  
  sleep 1
done

echo "$host:$port is available after $elapsed seconds"

if [ -n "$cmd" ]; then
  echo "Executing command: $cmd"
  exec $cmd
fi
