import { useState } from 'react';
import { Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import DocumentPreview from '../../components/ui/documentPreview';
import TailorRegistration from './TailorRegistration';
import CommonModal from '../../components/ui/commonModal';
import TableAlpha from '../../components/ui/TableAlpha';
import ActionDropdown from '../../components/ui/ActionDropdown';


const TailorVerification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [tailors, setTailors] = useState([
    {
      id: 1,
      name: 'Ahmed Traditional Tailoring',
      email: 'ahmed@traditionaltailoring.ae',
      phone: '+971 50 123 4567',
      location: 'Dubai',
      specialties: ['Kandura', 'Bisht', 'Traditional Wear'],
      experience: '15 years',
      documents: [
        {
          name: 'Trade License.pdf',
          type: 'application/pdf',
          size: '2.5 MB',
          url: 'https://example.com/trade-license.pdf'
        },
        {
          name: 'Emirates ID.jpg',
          type: 'image/jpeg',
          size: '1.2 MB',
          url: 'https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg'
        }
      ],
      submittedDate: '2024-03-15',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Modern Stitches',
      email: 'info@modernstitches.ae',
      phone: '+971 52 987 6543',
      location: 'Abu Dhabi',
      specialties: ['Formal Wear', 'Casual Alterations'],
      experience: '8 years',
      documents: [
        {
          name: 'Business Certificate.pdf',
          type: 'application/pdf',
          size: '1.8 MB',
          url: 'https://example.com/business-cert.pdf'
        }
      ],
      submittedDate: '2024-03-10',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Elite Tailors',
      email: 'contact@elitetailors.ae',
      phone: '+971 55 123 9876',
      location: 'Sharjah',
      specialties: ['Wedding Dresses', 'Formal Wear'],
      experience: '12 years',
      documents: [],
      submittedDate: '2024-03-08',
      status: 'rejected'
    }
  ]);

  const handleAddTailor = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTailor = (payload) => {
    console.log('Tailor Registration Payload:', payload);
    const newTailor = {
      id: tailors.length + 1,
      name: payload.businessInfo.businessName,
      email: payload.businessInfo.email,
      phone: payload.businessInfo.phone,
      location: payload.businessInfo.location,
      specialties: payload.professionalInfo.specialties,
      experience: payload.professionalInfo.experience,
      documents: [],
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setTailors(prev => [...prev, newTailor]);
    setIsModalOpen(false);

    alert('Tailor registered successfully!');
  };

  const handleViewTailor = (tailor) => {
    setSelectedTailor(tailor);
    setIsViewModalOpen(true);
  };

  const handleApproveTailor = (tailor) => {
    setTailors(prev =>
      prev.map(t =>
        t.id === tailor.id ? { ...t, status: 'approved' } : t
      )
    );
    alert(`${tailor.name} has been approved!`);
  };

  const handleRejectTailor = (tailor) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      setTailors(prev =>
        prev.map(t =>
          t.id === tailor.id ? { ...t, status: 'rejected', rejectionReason: reason } : t
        )
      );
      alert(`${tailor.name} has been rejected.`);
    }
  };

  const stats = {
    pending: tailors.filter(t => t.status === 'pending').length,
    approved: tailors.filter(t => t.status === 'approved').length,
    rejected: tailors.filter(t => t.status === 'rejected').length
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const tailorVerificationColumn = [
    {
      id: 'sno',
      header: 'S.No',
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Business Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.name}</div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Contact',
      cell: ({ row }) => (
        <div>
          <div className="text-sm text-gray-900">{row.original.phone}</div>
          <div className="text-sm text-gray-500">{row.original.location}</div>
        </div>
      ),
    },
    {
      accessorKey: 'specialties',
      header: 'Specialties',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.specialties?.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
          {row.original.specialties?.length > 2 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              +{row.original.specialties.length - 2}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'experience',
      header: 'Experience',
      cell: ({ row }) => row.original.experience,
    },
    {
      accessorKey: 'documents',
      header: 'Documents',
      cell: ({ row }) => (
        <DocumentPreview documents={row.original.documents || []} />
      ),
    },
    {
      accessorKey: 'submittedDate',
      header: 'Submitted',
      cell: ({ row }) => new Date(row.original.submittedDate).toLocaleDateString(),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ActionDropdown tailor={row.original} onApprove={handleApproveTailor} onReject={handleRejectTailor} onView={handleViewTailor} />,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tailor Verification</h1>
          <p className="text-gray-600 mt-1 capitalize">Review and approve tailor applications</p>
        </div>
        <button
          onClick={handleAddTailor}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Tailor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tailors Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Tailors</h2>
        </div>
        <div className="p-6">
          <TableAlpha
            data={tailors}
            columnsConfig={tailorVerificationColumn}
            showStatusFilter={true}
            showLocationFilter={true}
            itemsName="tailors"
          />
        </div>
      </div>

      {/* Add/Register Tailor Modal */}
      <CommonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Register New Tailor"
        size="xl"
        onSave={() => {
          // The form handles submission
          document.querySelector('form').requestSubmit();
        }}
        onCancel={handleCloseModal}
        saveText="Register Tailor"
        cancelText="Cancel"
      >
        <TailorRegistration onSubmit={handleSaveTailor} />
      </CommonModal>

      {/* View Tailor Modal */}
      <CommonModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedTailor?.name || 'Tailor Details'}
        size="lg"
        onSave={() => setIsViewModalOpen(false)}
        saveText="Close"
        onCancel={() => setIsViewModalOpen(false)}
      >
        {selectedTailor && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <p className="text-gray-900">{selectedTailor.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{selectedTailor.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{selectedTailor.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <p className="text-gray-900">{selectedTailor.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <p className="text-gray-900">{selectedTailor.experience}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedTailor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedTailor.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {selectedTailor.status.charAt(0).toUpperCase() + selectedTailor.status.slice(1)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedTailor.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Documents
              </label>
              <DocumentPreview documents={selectedTailor.documents} />
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default TailorVerification;