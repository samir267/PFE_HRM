interface OrganizationCardProps {
  organizationName: string;
  organizationId: string;
  planType: string;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organizationName = 'Spi Efe',
  organizationId = '886029677',
  planType = 'Trial'
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
          MY ORGANIZATION
        </h2>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start gap-4">
          {/* Initials circle */}
          <div className="bg-blue-100 text-blue-800 rounded-full h-12 w-12 flex items-center justify-center font-semibold shrink-0 text-lg">
            {organizationName.split(' ').map(word => word[0]).join('')}
          </div>
          
          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-3">
              <h3 className="text-gray-900 font-medium text-lg">
                {organizationName}
              </h3>
              <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {planType}
              </span>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              Organization ID: <span className="text-gray-700">{organizationId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationCard

