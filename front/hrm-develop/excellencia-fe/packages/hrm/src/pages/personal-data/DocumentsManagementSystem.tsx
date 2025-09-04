// import React, { useState, useEffect } from 'react';
// import {
//   FiFileText,
//   FiUpload,
//   FiFolderPlus,
//   FiFilePlus,
//   FiSearch,
//   FiPlus,
//   FiUsers,
//   FiClock,
//   FiDownload,
//   FiEdit,
//   FiTrash2,
//   FiAlertCircle,
//   FiInfo,
//   FiX,
//   FiChevronRight,
//   FiHome,
//   FiBell,
//   FiUser,
//   FiSave,
//   FiFolder,
//   FiChevronDown,
//   FiFile,
//   FiFileText as FiDocument,
//   FiList,
//   FiGrid,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiFilter,
//   FiArchive,
//   FiGlobe,
//   FiShare2,
//   FiLock, // New icon for Private
//   FiFileMinus, // New icon for Draft
//   FiGitMerge // Icon for the new chart tree view
// } from 'react-icons/fi';

// // Fix for 'webkitdirectory' type error
// declare module 'react' {
//   interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
//     webkitdirectory?: 'true' | 'false' | '';
//     mozdirectory?: 'true' | 'false' | '';
//   }
// }

// // Custom UUID generator to avoid external dependency and TypeScript errors
// const generateUUID = (): string => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     const r = Math.random() * 16 | 0;
//     const v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// };

// // Define the interfaces for our file system structure
// interface FileMetadata {
//   category: string;
//   description: string;
//   status: 'Draft' | 'Published' | 'Archived';
//   tags: string[];
//   access: 'Public' | 'Private';
//   creationDate: Date;
//   lastModifiedDate: Date;
// }

// interface File {
//   id: string;
//   name: string;
//   type: 'file';
//   fileType: string; // Added to store the actual file MIME type
//   content: string; // Now can hold text content or a data URL
//   metadata: FileMetadata;
// }

// interface Folder {
//   id: string;
//   name: string;
//   type: 'folder';
//   children: FileSystemEntry[];
//   isExpanded: boolean;
// }

// type FileSystemEntry = File | Folder;

// interface Notification {
//   id: number;
//   message: string;
//   type: 'info' | 'success' | 'error' | 'warning';
// }

// // Initial dummy data for the file system
// const initialFileSystem: FileSystemEntry[] = [
//   {
//     id: generateUUID(),
//     name: 'Documents',
//     type: 'folder',
//     isExpanded: true,
//     children: [
//       {
//         id: generateUUID(),
//         name: 'Finance',
//         type: 'folder',
//         isExpanded: false,
//         children: [
//           {
//             id: generateUUID(),
//             name: 'Q1_Report.txt',
//             type: 'file',
//             fileType: 'text/plain',
//             content: 'This is the content of the Q1 financial report.',
//             metadata: {
//               category: 'Financial',
//               description: 'Quarterly report for Q1 2025.',
//               status: 'Published',
//               tags: ['report', 'finance', 'Q1'],
//               access: 'Public',
//               creationDate: new Date(),
//               lastModifiedDate: new Date(),
//             },
//           },
//           {
//             id: generateUUID(),
//             name: 'Budget_Plan.txt',
//             type: 'file',
//             fileType: 'text/plain',
//             content: 'This file contains the budget plan for the next fiscal year.',
//             metadata: {
//               category: 'Financial',
//               description: 'Budget plan for the upcoming year.',
//               status: 'Draft',
//               tags: ['budget', 'planning'],
//               access: 'Private',
//               creationDate: new Date(),
//               lastModifiedDate: new Date(),
//             },
//           },
//         ],
//       },
//       {
//         id: generateUUID(),
//         name: 'Human Resources',
//         type: 'folder',
//         isExpanded: false,
//         children: [],
//       },
//       {
//         id: generateUUID(),
//         name: 'Project Alpha.pdf',
//         type: 'file',
//         fileType: 'application/pdf',
//         content: 'Project Alpha documentation.',
//         metadata: {
//           category: 'Projects',
//           description: 'Documentation for Project Alpha.',
//           status: 'Published',
//           tags: ['project', 'alpha', 'documentation'],
//           access: 'Public',
//           creationDate: new Date(),
//           lastModifiedDate: new Date(),
//         },
//       },
//       {
//         id: generateUUID(),
//         name: 'Old_Contract.pdf',
//         type: 'file',
//         fileType: 'application/pdf',
//         content: 'This is an old contract.',
//         metadata: {
//           category: 'Legal',
//           description: 'An old contract that has been archived.',
//           status: 'Archived',
//           tags: ['contract', 'legal'],
//           access: 'Private',
//           creationDate: new Date(),
//           lastModifiedDate: new Date(),
//         },
//       },
//     ],
//   },
//   {
//     id: generateUUID(),
//     name: 'Images',
//     type: 'folder',
//     isExpanded: false,
//     children: [],
//   },
// ];

// interface FilterState {
//   type: 'all' | 'file' | 'folder';
//   status: 'all' | 'Draft' | 'Published' | 'Archived';
//   category: string;
//   access: 'all' | 'Public' | 'Private';
// }

// const DocumentsManagementSystem: React.FC = () => {
//   const [fileSystem, setFileSystem] = useState<FileSystemEntry[]>(initialFileSystem);
//   const [currentPath, setCurrentPath] = useState<string[]>(['Documents']);
//   const [activeView, setActiveView] = useState<'list' | 'add' | 'viewContent'>('list');
//   const [editingEntry, setEditingEntry] = useState<File | Folder | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [modalAction, setModalAction] = useState<(() => void) | null>(null);
//   const [viewingFile, setViewingFile] = useState<File | null>(null);
//   const [viewMode, setViewMode] = useState<'list' | 'card' | 'chart'>('list');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState<FilterState>({
//     type: 'all',
//     status: 'all',
//     category: '',
//     access: 'all'
//   });

//   const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private' | 'draft' | 'archive' | 'trash'>('all');
//   const [trashedEntries, setTrashedEntries] = useState<FileSystemEntry[]>([]);

//   // Helper function to find a folder by path, returning its children array
//   const findFolderChildrenByPath = (path: string[], entries: FileSystemEntry[]): FileSystemEntry[] | null => {
//     let currentEntries: FileSystemEntry[] = entries;
//     if (path.length === 0) return currentEntries;

//     for (const name of path) {
//       const folder = currentEntries.find(
//         (entry) => entry.type === 'folder' && entry.name === name
//       ) as Folder | undefined;
//       if (!folder) return null;
//       currentEntries = folder.children;
//     }
//     return currentEntries;
//   };
  
//   // A new helper function to find an entry (file or folder) and its parent's children array
//   const findEntryAndParent = (entries: FileSystemEntry[], path: string[], entryId: string, parentChildren: FileSystemEntry[] | null = null): { entry: FileSystemEntry | null, parentChildren: FileSystemEntry[] | null } => {
//     const currentEntries = path.length === 0 ? entries : findFolderChildrenByPath(path, entries);
//     if (!currentEntries) return { entry: null, parentChildren: null };
    
//     const entry = currentEntries.find(e => e.id === entryId);
//     if (entry) {
//       return { entry, parentChildren: currentEntries };
//     }

//     for (const subEntry of currentEntries) {
//       if (subEntry.type === 'folder') {
//         const result = findEntryAndParent(subEntry.children, [], entryId, subEntry.children);
//         if (result.entry) {
//           return result;
//         }
//       }
//     }
    
//     return { entry: null, parentChildren: null };
//   };

//   // NEW: Helper to flatten the file system recursively
//   const flattenFileSystem = (entries: FileSystemEntry[]): FileSystemEntry[] => {
//     let allEntries: FileSystemEntry[] = [];
//     entries.forEach(entry => {
//       allEntries.push(entry);
//       if (entry.type === 'folder') {
//         allEntries = allEntries.concat(flattenFileSystem(entry.children));
//       }
//     });
//     return allEntries;
//   };

//   // NEW: Helper to update a file/folder deep in the tree immutably
//   const updateEntryInSystem = (entries: FileSystemEntry[], entryId: string, updateFn: (entry: FileSystemEntry) => FileSystemEntry): FileSystemEntry[] => {
//     return entries.map(entry => {
//       if (entry.id === entryId) {
//         return updateFn(entry);
//       }
//       if (entry.type === 'folder') {
//         return {
//           ...entry,
//           children: updateEntryInSystem(entry.children, entryId, updateFn)
//         };
//       }
//       return entry;
//     });
//   };

//   // NEW: Handler for special tab navigation
//   const handleTabNavigation = (tab: 'all' | 'public' | 'private' | 'draft' | 'archive' | 'trash') => {
//     setActiveTab(tab);
//     // Reset path when switching to a special tab view
//     if (tab !== 'all') {
//       setCurrentPath([]);
//     }
//     setActiveView('list');
//     setSearchQuery('');
//   };

//   // Notification management
//   const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
//     const id = Date.now();
//     setNotifications((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => {
//       removeNotification(id);
//     }, 5000);
//   };

//   const removeNotification = (id: number) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   };

//   // Modal handlers
//   const openConfirmationModal = (actionType: string, entry?: File | Folder) => {
//     let content = '';
//     let action: (() => void) | null = null;
    
//     switch (actionType) {
//       case 'deleteEntry':
//         content = `Are you sure you want to delete "${entry?.name}"? It will be moved to trash.`;
//         action = () => handleDeleteEntry(entry!);
//         break;
//       case 'saveEntry':
//         content = 'Are you sure you want to save these changes?';
//         action = handleSaveEntry;
//         break;
//       case 'permanentDelete':
//         content = `Are you sure you want to permanently delete "${entry?.name}"? This action cannot be undone.`;
//         action = () => handlePermanentDelete(entry!);
//         break;
//       case 'restoreEntry':
//         content = `Are you sure you want to restore "${entry?.name}"? It will be moved back to its original location (or root).`;
//         action = () => handleRestoreEntry(entry!);
//         break;
//       default:
//         content = 'Are you sure you want to proceed?';
//         action = null;
//     }
    
//     setModalContent(content);
//     setModalAction(() => action);
//     setShowModal(true);
//   };

//   const handleModalConfirm = () => {
//     if (modalAction) {
//       modalAction();
//     }
//     setShowModal(false);
//   };

//   const handleModalCancel = () => {
//     setShowModal(false);
//     setModalContent('');
//     setModalAction(null);
//     addNotification('Action cancelled.', 'info');
//   };

//   // Entry handlers
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     if (!editingEntry) return;

//     if (editingEntry.type === 'file') {
//       if (name === 'name' || name === 'content') {
//         setEditingEntry({ ...editingEntry, [name]: value });
//       } else {
//         setEditingEntry({
//           ...editingEntry,
//           metadata: {
//             ...editingEntry.metadata,
//             [name]: value,
//           },
//         });
//       }
//     } else {
//       setEditingEntry({ ...editingEntry, [name]: value });
//     }
//   };

//   const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (editingEntry?.type === 'file') {
//       setEditingEntry({
//         ...editingEntry,
//         metadata: {
//           ...editingEntry.metadata,
//           tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag),
//         },
//       });
//     }
//   };

//   // This is the core function for adding/updating entries immutably
//   const updateFileSystem = (entries: FileSystemEntry[], path: string[], newEntry: FileSystemEntry): FileSystemEntry[] => {
//     if (path.length === 0) {
//       const existingEntryIndex = entries.findIndex(e => e.id === newEntry.id);
//       if (existingEntryIndex !== -1) {
//         return entries.map(e => e.id === newEntry.id ? newEntry : e);
//       }
//       return [...entries, newEntry];
//     }
  
//     const [currentPathName, ...restOfPath] = path;
//     return entries.map(entry => {
//       if (entry.type === 'folder' && entry.name === currentPathName) {
//         const updatedChildren = updateFileSystem(entry.children, restOfPath, newEntry);
//         return { ...entry, children: updatedChildren };
//       }
//       return entry;
//     });
//   };

//   const deleteEntryFromSystem = (entries: FileSystemEntry[], path: string[], idToDelete: string): FileSystemEntry[] => {
//     if (path.length === 0) {
//       return entries.filter(entry => entry.id !== idToDelete);
//     }

//     const [currentPathName, ...restOfPath] = path;
//     return entries.map(entry => {
//       if (entry.type === 'folder' && entry.name === currentPathName) {
//         const updatedChildren = deleteEntryFromSystem(entry.children, restOfPath, idToDelete);
//         return { ...entry, children: updatedChildren };
//       }
//       return entry;
//     });
//   };

//   const handleSaveEntry = () => {
//     if (!editingEntry) {
//       addNotification('Error: No entry to save.', 'error');
//       setShowModal(false);
//       return;
//     }

//     const parentPath = currentPath;
//     const isNewEntry = !editingEntry.id;
    
//     const finalEntry = isNewEntry
//       ? { ...editingEntry, id: generateUUID() }
//       : editingEntry;

//     const entryToSave = (finalEntry.type === 'file')
//       ? {
//         ...finalEntry,
//         metadata: {
//           ...finalEntry.metadata,
//           creationDate: isNewEntry ? new Date() : finalEntry.metadata.creationDate,
//           lastModifiedDate: new Date(),
//         }
//       }
//       : finalEntry;

//     setFileSystem(prevFs => updateFileSystem(prevFs, parentPath, entryToSave));
    
//     addNotification(
//       `Entry "${entryToSave.name}" ${isNewEntry ? 'added' : 'updated'} successfully!`,
//       'success'
//     );
//     setEditingEntry(null);
//     setActiveView('list');
//     setShowModal(false);
//   };
  
//   // NEW: Move entry to trash instead of permanent deletion
//   const handleDeleteEntry = (entryToDelete: File | Folder) => {
//     setFileSystem(prevFs => {
//       const parentPath = currentPath;
//       const updatedFs = deleteEntryFromSystem(prevFs, parentPath, entryToDelete.id);
//       return updatedFs;
//     });
//     setTrashedEntries(prev => [...prev, entryToDelete]);
//     addNotification(`Entry "${entryToDelete.name}" moved to trash.`, 'info');
//   };

//   // NEW: Restore entry from trash
//   const handleRestoreEntry = (entryToRestore: File | Folder) => {
//     setTrashedEntries(prev => prev.filter(entry => entry.id !== entryToRestore.id));
//     setFileSystem(prevFs => updateFileSystem(prevFs, [], entryToRestore));
//     addNotification(`Entry "${entryToRestore.name}" restored successfully!`, 'success');
//   };

//   // NEW: Permanent delete from trash
//   const handlePermanentDelete = (entryToDelete: File | Folder) => {
//     setTrashedEntries(prev => prev.filter(entry => entry.id !== entryToDelete.id));
//     addNotification(`Entry "${entryToDelete.name}" permanently deleted.`, 'error');
//   };

//   // NEW: Actions to change status and access
//   const handleFileStatusChange = (file: File, newStatus: FileMetadata['status']) => {
//     setFileSystem(prevFs => updateEntryInSystem(prevFs, file.id, (entry) => {
//       if (entry.type === 'file') {
//         return {
//           ...entry,
//           metadata: {
//             ...entry.metadata,
//             status: newStatus,
//             lastModifiedDate: new Date(),
//           }
//         };
//       }
//       return entry;
//     }));
//     addNotification(`File "${file.name}" status changed to "${newStatus}".`, 'success');
//   };

//   const handleFileAccessChange = (file: File, newAccess: FileMetadata['access']) => {
//     setFileSystem(prevFs => updateEntryInSystem(prevFs, file.id, (entry) => {
//       if (entry.type === 'file') {
//         return {
//           ...entry,
//           metadata: {
//             ...entry.metadata,
//             access: newAccess,
//             lastModifiedDate: new Date(),
//           }
//         };
//       }
//       return entry;
//     }));
//     addNotification(`File "${file.name}" access changed to "${newAccess}".`, 'success');
//   };


//   const handleNavigateToFolder = (path: string[]) => {
//     setCurrentPath(path);
//     setActiveTab('all'); // Reset special tab view
//     setActiveView('list');
//     setSearchQuery('');
//   };

//   // CORRECTED toggleFolderExpansion logic
//   const toggleFolderExpansion = (path: string[]) => {
//     setFileSystem(prevFs => {
//       const toggleRecursive = (entries: FileSystemEntry[], currentPath: string[]): FileSystemEntry[] => {
//         if (currentPath.length === 0) return entries;
        
//         const [targetName, ...restOfPath] = currentPath;
//         return entries.map(entry => {
//           if (entry.type === 'folder' && entry.name === targetName) {
//             return {
//               ...entry,
//               isExpanded: restOfPath.length === 0 ? !entry.isExpanded : entry.isExpanded,
//               children: toggleRecursive(entry.children, restOfPath),
//             };
//           }
//           return entry;
//         });
//       };
//       return toggleRecursive(prevFs, path);
//     });
//   };

//   // NEW: Handler to view a file's content
// git 
//   };

//   // NEW: Handler for direct file uploads
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
    
//     const file = files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const fileContent = event.target?.result as string;

//       const newFile: File = {
//         id: generateUUID(),
//         name: file.name,
//         type: 'file',
//         fileType: file.type || 'unknown',
//         content: fileContent,
//         metadata: {
//           category: 'Uploaded',
//           description: `Uploaded file: ${file.name}`,
//           status: 'Draft',
//           tags: [file.type.split('/')[0], 'upload'],
//           access: 'Private',
//           creationDate: new Date(),
//           lastModifiedDate: new Date(),
//         },
//       };

//       setFileSystem(prevFs => updateFileSystem(prevFs, currentPath, newFile));
//       addNotification(`File "${file.name}" uploaded successfully!`, 'success');
//     };

//     if (file.type.startsWith('text/')) {
//         reader.readAsText(file);
//     } else {
//         reader.readAsDataURL(file);
//     }
//   };

//   // NEW: Handler for folder uploads
//   const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const newFolder: Folder = {
//       id: generateUUID(),
//       name: `Uploaded Folder (${new Date().toLocaleString()})`,
//       type: 'folder',
//       isExpanded: true,
//       children: [],
//     };

//     const newChildren: FileSystemEntry[] = [];
//     Array.from(files).forEach((file: any) => {
//       const newFile: File = {
//         id: generateUUID(),
//         name: file.name,
//         type: 'file',
//         fileType: file.type || 'unknown',
//         content: `Simulated content for uploaded file: ${file.webkitRelativePath || file.name}`,
//         metadata: {
//           category: 'Uploaded',
//           description: `Uploaded file: ${file.name}`,
//           status: 'Draft',
//           tags: [file.type.split('/')[0], 'upload'],
//           access: 'Private',
//           creationDate: new Date(),
//           lastModifiedDate: new Date(),
//         },
//       };
//       newChildren.push(newFile);
//     });

//     newFolder.children = newChildren;
//     setFileSystem(prevFs => updateFileSystem(prevFs, currentPath, newFolder));
//     addNotification(`Folder uploaded successfully!`, 'success');
//   };

//   // NEW: Drag and Drop functionality
//   const handleDragStart = (e: React.DragEvent, entryId: string) => {
//     e.dataTransfer.setData('entryId', entryId);
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent, targetPath: string[]) => {
//     e.preventDefault();
//     const entryId = e.dataTransfer.getData('entryId');

//     // Find the entry being moved and its parent
//     const { entry, parentChildren } = findEntryAndParent(fileSystem, [], entryId);
//     if (!entry || !parentChildren) {
//       addNotification('Error: Could not find the item to move.', 'error');
//       return;
//     }
    
//     // Find the target folder's children array
//     const targetFolderChildren = findFolderChildrenByPath(targetPath, fileSystem);
//     if (!targetFolderChildren) {
//       addNotification('Error: Could not find the destination folder.', 'error');
//       return;
//     }
    
//     // Check if the entry is being dropped into its own folder
//     if (parentChildren === targetFolderChildren) {
//       addNotification('Item is already in this folder.', 'info');
//       return;
//     }
    
//     // Check if a folder is being moved into one of its own sub-folders
//     if (entry.type === 'folder' && targetPath.join('/').startsWith([...currentPath, entry.name].join('/'))) {
//         addNotification('Cannot move a folder into its own subdirectory.', 'error');
//         return;
//     }

//     // Check for name collision in the target folder
//     const nameCollision = targetFolderChildren.some(e => e.name === entry.name && e.id !== entryId);
//     if (nameCollision) {
//         addNotification(`An item with the name "${entry.name}" already exists here.`, 'error');
//         return;
//     }
    
//     setFileSystem(prevFs => {
//         // 1. Remove the entry from its original location
//         const newFsAfterDeletion = deleteEntryFromSystem(prevFs, currentPath, entryId);
        
//         // 2. Add the entry to the new location
//         const newFsAfterAddition = updateFileSystem(newFsAfterDeletion, targetPath, entry);
        
//         return newFsAfterAddition;
//     });

//     addNotification(`"${entry.name}" moved successfully!`, 'success');
//     setCurrentPath(targetPath);
//   };

//   // Render the tree view recursively with drag-and-drop
//   const renderTreeView = (entries: FileSystemEntry[], path: string[]) => {
//     return entries.map(entry => (
//       <div key={entry.id} className="ml-4">
//         {entry.type === 'folder' ? (
//           <div 
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, [...path, entry.name])}
//             className="rounded-md"
//           >
//             <div
//               className={`flex items-center cursor-pointer p-1 rounded-md transition-colors ${
//                 currentPath.join('/') === [...path, entry.name].join('/') && activeTab === 'all' ? 'bg-orange-600 hover:bg-orange-700 text-white font-semibold' : 'hover:bg-gray-700'
//               }`}
//               onClick={() => {
//                 toggleFolderExpansion([...path, entry.name]);
//                 handleNavigateToFolder([...path, entry.name]);
//               }}
//               draggable
//               onDragStart={(e) => handleDragStart(e, entry.id)}
//             >
//               {entry.isExpanded ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
//               <FiFolder className="text-gray-400 mr-2" />
//               <span>{entry.name}</span>
//             </div>
//             {entry.isExpanded && entry.children.length > 0 && (
//               <div className="pl-2">
//                 {renderTreeView(entry.children, [...path, entry.name])}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div
//             className={`flex items-center p-1 rounded-md hover:bg-gray-700 transition-colors cursor-pointer`}
//             onClick={() => handleViewFileContent(entry)}
//             draggable
//             onDragStart={(e) => handleDragStart(e, entry.id)}
//           >
//             <FiDocument className="text-gray-400 mr-2 ml-4" />
//             <span>{entry.name}</span>
//           </div>
//         )}
//       </div>
//     ));
//   };


//   // Filter current folder's content for search & filters
//   const getEntriesToDisplay = () => {
//     switch(activeTab) {
//       case 'public':
//         return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.access === 'Public');
//       case 'private':
//         return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.access === 'Private');
//       case 'draft':
//         return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.status === 'Draft');
//       case 'archive':
//         return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.status === 'Archived');
//       case 'trash':
//         return trashedEntries;
//       case 'all':
//       default:
//         return findFolderChildrenByPath(currentPath, fileSystem) || [];
//     }
//   };

//   const entriesToFilter = getEntriesToDisplay();

//   const filteredEntries = entriesToFilter.filter(entry => {
//     const matchesSearch = 
//       entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (entry.type === 'file' && (
//         entry.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         entry.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//       ));

//     const matchesType = filters.type === 'all' || entry.type === filters.type;
    
//     const matchesStatus = 
//       filters.status === 'all' ||
//       (entry.type === 'file' && entry.metadata.status === filters.status);

//     const matchesCategory = 
//       filters.category === '' ||
//       (entry.type === 'file' && entry.metadata.category.toLowerCase().includes(filters.category.toLowerCase()));

//     const matchesAccess = 
//       filters.access === 'all' ||
//       (entry.type === 'file' && entry.metadata.access === filters.access);
      
//     return matchesSearch && matchesType && matchesStatus && matchesCategory && matchesAccess;
//   });

//   const getHeaderTitle = () => {
//     switch(activeTab) {
//       case 'public':
//         return 'Public Documents';
//       case 'private':
//         return 'Private Documents';
//       case 'draft':
//         return 'Draft Documents';
//       case 'archive':
//         return 'Archive';
//       case 'trash':
//         return 'Trash';
//       case 'all':
//       default:
//         return `Contents of "${currentPath.length > 0 ? currentPath[currentPath.length-1] : 'Root'}"`;
//     }
//   };

//   const renderActions = (entry: FileSystemEntry) => {
//     if (entry.type === 'folder') {
//         return (
//             <div className="flex space-x-2">
//                 <button
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         setEditingEntry(entry);
//                         setActiveView('add');
//                     }}
//                     className="text-indigo-600 hover:text-indigo-900"
//                     title="Update Folder"
//                 >
//                     <FiEdit className="inline-block" />
//                 </button>
//                 <button
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         openConfirmationModal('deleteEntry', entry);
//                     }}
//                     className="text-red-600 hover:text-red-900"
//                     title="Delete Folder"
//                 >
//                     <FiTrash2 className="inline-block" />
//                 </button>
//             </div>
//         );
//     }

//     // Actions for a file
//     const file = entry as File;

//     const actionButtons = [];
    
//     // Status Actions
//     if (file.metadata.status !== 'Published') {
//         actionButtons.push(
//             <button
//                 key="publish"
//                 onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Published'); }}
//                 className="text-green-600 hover:text-green-900"
//                 title="Publish"
//             >
//                 <FiGlobe className="inline-block" />
//             </button>
//         );
//     }
//     if (file.metadata.status !== 'Archived') {
//         actionButtons.push(
//             <button
//                 key="archive"
//                 onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Archived'); }}
//                 className="text-yellow-600 hover:text-yellow-900"
//                 title="Archive"
//             >
//                 <FiArchive className="inline-block" />
//             </button>
//         );
//     }
//     if (file.metadata.status !== 'Draft') {
//         actionButtons.push(
//             <button
//                 key="draft"
//                 onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Draft'); }}
//                 className="text-blue-600 hover:text-blue-900"
//                 title="Move to Draft"
//             >
//                 <FiFileMinus className="inline-block" />
//             </button>
//         );
//     }

//     // Access Actions
//     if (file.metadata.access !== 'Public') {
//         actionButtons.push(
//             <button
//                 key="share"
//                 onClick={(e) => { e.stopPropagation(); handleFileAccessChange(file, 'Public'); }}
//                 className="text-purple-600 hover:text-purple-900"
//                 title="Share (Public)"
//             >
//                 <FiShare2 className="inline-block" />
//             </button>
//         );
//     }
//     if (file.metadata.access !== 'Private') {
//         actionButtons.push(
//             <button
//                 key="private"
//                 onClick={(e) => { e.stopPropagation(); handleFileAccessChange(file, 'Private'); }}
//                 className="text-orange-600 hover:text-orange-900"
//                 title="Make Private"
//             >
//                 <FiLock className="inline-block" />
//             </button>
//         );
//     }

//     // Standard Actions
//     actionButtons.push(
//         <button
//             key="edit"
//             onClick={(e) => { e.stopPropagation(); setEditingEntry(file); setActiveView('add'); }}
//             className="text-indigo-600 hover:text-indigo-900"
//             title="Update File"
//         >
//             <FiEdit className="inline-block" />
//         </button>
//     );

//     actionButtons.push(
//         <button
//             key="delete"
//             onClick={(e) => { e.stopPropagation(); openConfirmationModal('deleteEntry', file); }}
//             className="text-red-600 hover:text-red-900"
//             title="Delete File"
//         >
//             <FiTrash2 className="inline-block" />
//         </button>
//     );

//     return <div className="flex space-x-2">{actionButtons}</div>;
// };

// const renderTrashActions = (entry: FileSystemEntry) => {
//     return (
//         <div className="flex space-x-2">
//             <button
//                 onClick={(e) => { e.stopPropagation(); openConfirmationModal('restoreEntry', entry); }}
//                 className="text-green-600 hover:text-green-900"
//                 title="Restore"
//             >
//                 <FiSave className="inline-block" />
//             </button>
//             <button
//                 onClick={(e) => { e.stopPropagation(); openConfirmationModal('permanentDelete', entry); }}
//                 className="text-red-600 hover:text-red-900"
//                 title="Delete Permanently"
//             >
//                 <FiTrash2 className="inline-block" />
//             </button>
//         </div>
//     );
// };

//   // NEW: Recursive function for the Chart Tree View
//   const renderChartTreeView = (entries: FileSystemEntry[], path: string[]) => {
//     return (
//         <ul className="space-y-2">
//             {entries.map((entry, index) => (
//                 <li key={entry.id} className="relative">
//                     {/* The connector line */}
//                     <div className={`absolute top-0 left-0 w-6 h-full ${index === entries.length - 1 ? '' : 'border-l border-gray-300'}`}></div>
                    
//                     <div className="flex items-center space-x-2 group relative">
//                         {/* The horizontal line */}
//                         <div className="absolute top-1/2 -left-2 w-4 h-px bg-gray-300"></div>

//                         <div 
//                             className="flex-grow flex items-center space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 p-2 rounded-md transition-colors"
//                             onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...path, entry.name]) : handleViewFileContent(entry as File)}
//                         >
//                             {entry.type === 'folder' ? <FiFolder className="text-orange-500" /> : <FiDocument className="text-blue-500" />}
//                             <span>{entry.name}</span>
//                         </div>
//                     </div>
//                     {entry.type === 'folder' && entry.children.length > 0 && (
//                         <div className="pl-6">
//                             {renderChartTreeView(entry.children, [...path, entry.name])}
//                         </div>
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex font-sans">
      
//       {/* Sidebar with Tree View */}
//       <div className={`bg-gray-800 text-white p-4 shadow-lg flex-col transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-80 flex' : 'w-0 hidden'}`}>
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-2">
//             <FiHome className="text-orange-500 w-6 h-6" />
//             <span className="text-xl font-bold">File Explorer</span>
//           </div>
//         </div>

//         {/* NEW: Special Tabs Section */}
//         <div className="mb-4">
//           <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Views</h4>
//           <ul className="space-y-1">
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('all')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'all' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiFolder className="mr-2" /> My Drive
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('draft')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'draft' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiFileMinus className="mr-2" /> Drafts
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('private')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'private' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiLock className="mr-2" /> Private
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('public')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'public' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiShare2 className="mr-2" /> Public
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('archive')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'archive' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiArchive className="mr-2" /> Archive
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleTabNavigation('trash')}
//                 className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'trash' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
//               >
//                 <FiTrash2 className="mr-2" /> Trash
//               </button>
//             </li>
//           </ul>
//         </div>

//         <div className="overflow-y-auto flex-grow">
//           {activeTab === 'all' && (
//             <>
//               <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Folders</h4>
//               <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, [])} className="min-h-12 rounded-md">
//                 {renderTreeView(fileSystem, [])}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         className="fixed top-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white p-2 rounded-r-lg shadow-lg"
//       >
//         {isSidebarOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
//       </button>

//       {/* Main Content Area */}
//       <div className={`flex-grow p-8 bg-gray-50 flex flex-col rounded-t-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0' : 'ml-12'}`}>
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 flex items-center">
//             <FiDocument className="mr-3 text-orange-500" />
//             <div className="flex items-center text-xl font-semibold text-gray-600">
//                 <button className="flex items-center hover:text-orange-600" onClick={() => handleNavigateToFolder([])}>
//                   <FiHome className="mr-1" /> Root
//                 </button>
//                 {activeTab === 'all' && currentPath.map((folderName, index) => (
//                   <div key={index} className="flex items-center">
//                     <FiChevronRight className="mx-1" />
//                     <button
//                       className="hover:text-orange-600"
//                       onClick={() => handleNavigateToFolder(currentPath.slice(0, index + 1))}
//                     >
//                       {folderName}
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </h2>
//           <div className="flex space-x-4">
//             {activeView === 'list' && (
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search current folder..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
//                 />
//                 <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//             )}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md"
//             >
//               <FiFilter className="mr-2" /> Filters
//             </button>
//             <label htmlFor="file-upload" className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md">
//                 <FiUpload className="mr-2" /> Upload File
//             </label>
//             <input id="file-upload" type="file" onChange={handleFileUpload} className="sr-only" />

//             <label htmlFor="folder-upload" className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md">
//                 <FiUpload className="mr-2" /> Upload Folder
//             </label>
//             <input id="folder-upload" type="file" onChange={handleFolderUpload} className="sr-only" multiple webkitdirectory="" />

//             <button
//               onClick={() => {
//                 setEditingEntry({
//                   id: '',
//                   name: '',
//                   type: 'file',
//                   fileType: '',
//                   content: '',
//                   metadata: {
//                     category: '',
//                     description: '',
//                     status: 'Draft',
//                     tags: [],
//                     access: 'Private',
//                     creationDate: new Date(),
//                     lastModifiedDate: new Date(),
//                   }
//                 });
//                 setActiveView('add');
//               }}
//               className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
//             >
//               <FiFilePlus className="mr-2" /> Add New File
//             </button>
//             <button
//               onClick={() => {
//                 setEditingEntry({
//                   id: '',
//                   name: '',
//                   type: 'folder',
//                   children: [],
//                   isExpanded: false
//                 });
//                 setActiveView('add');
//               }}
//               className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
//             >
//               <FiFolderPlus className="mr-2" /> Add New Folder
//             </button>
//           </div>
//         </div>
        
//         {/* Powerful Filter Section */}
//         {showFilters && (
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
//             <h4 className="text-lg font-semibold mb-4">Advanced Filters</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Type</label>
//                 <select
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   value={filters.type}
//                   onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | 'file' | 'folder' })}
//                 >
//                   <option value="all">All</option>
//                   <option value="file">File</option>
//                   <option value="folder">Folder</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   value={filters.status}
//                   onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'Draft' | 'Published' | 'Archived' })}
//                 >
//                   <option value="all">All</option>
//                   <option value="Draft">Draft</option>
//                   <option value="Published">Published</option>
//                   <option value="Archived">Archived</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Access</label>
//                 <select
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   value={filters.access}
//                   onChange={(e) => setFilters({ ...filters, access: e.target.value as 'all' | 'Public' | 'Private' })}
//                 >
//                   <option value="all">All</option>
//                   <option value="Public">Public</option>
//                   <option value="Private">Private</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Category</label>
//                 <input
//                   type="text"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   placeholder="e.g., Finance"
//                   value={filters.category}
//                   onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* View Toggle and dynamic content */}
//         {activeView === 'list' && (
//           <>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {getHeaderTitle()}
//               </h3>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
//                   title="List View"
//                 >
//                   <FiList className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('card')}
//                   className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
//                   title="Card View"
//                 >
//                   <FiGrid className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('chart')}
//                   className={`p-2 rounded-md transition-colors ${viewMode === 'chart' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
//                   title="Chart Tree View"
//                 >
//                   <FiGitMerge className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {viewMode === 'chart' ? (
//               <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">File System Hierarchy</h3>
//                 {renderChartTreeView(fileSystem, [])}
//               </div>
//             ) : viewMode === 'card' ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredEntries.length > 0 ? (
//                   filteredEntries.map((entry) => (
//                     <div
//                       key={entry.id}
//                       className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
//                       onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...currentPath, entry.name]) : handleViewFileContent(entry as File)}
//                       draggable={activeTab === 'all'}
//                       onDragStart={(e) => activeTab === 'all' && handleDragStart(e, entry.id)}
//                       onDragOver={handleDragOver}
//                       onDrop={(e) => entry.type === 'folder' && handleDrop(e, [...currentPath, entry.name])}
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         {entry.type === 'folder' ? (
//                           <FiFolder className="w-8 h-8 text-orange-500" />
//                         ) : (
//                           <FiDocument className="w-8 h-8 text-blue-500" />
//                         )}
//                         {activeTab === 'trash' ? renderTrashActions(entry) : renderActions(entry)}
//                       </div>
//                       <h4 className="text-sm font-semibold text-gray-800 truncate">{entry.name}</h4>
//                       {entry.type === 'file' && (
//                         <div className="mt-2">
//                           <p className="text-xs text-gray-500 truncate">{entry.metadata.description || 'No description'}</p>
//                           <span
//                             className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               entry.metadata.status === 'Published'
//                                 ? 'bg-green-100 text-green-800'
//                                 : entry.metadata.status === 'Draft'
//                                   ? 'bg-blue-100 text-blue-800'
//                                   : 'bg-yellow-100 text-yellow-800'
//                             }`}
//                           >
//                             {entry.metadata.status}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full text-center py-10 text-gray-500">
//                     No items found in this folder.
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Name
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Type
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Last Modified
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {filteredEntries.length > 0 ? (
//                         filteredEntries.map((entry) => (
//                           <tr key={entry.id}
//                             draggable={activeTab === 'all'}
//                             onDragStart={(e) => activeTab === 'all' && handleDragStart(e, entry.id)}
//                             onDragOver={handleDragOver}
//                             onDrop={(e) => entry.type === 'folder' && handleDrop(e, [...currentPath, entry.name])}
//                             className="hover:bg-gray-50 transition-colors"
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap cursor-pointer"
//                                 onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...currentPath, entry.name]) : handleViewFileContent(entry as File)}>
//                               <div className="flex items-center">
//                                 {entry.type === 'folder' ? (
//                                     <FiFolder className="text-gray-400 mr-2" />
//                                 ) : (
//                                     <FiDocument className="text-gray-400 mr-2" />
//                                 )}
//                                 <div className="text-sm font-medium text-gray-900">{entry.name}</div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                               {entry.type}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               {entry.type === 'file' && (
//                                 <span
//                                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                     entry.metadata.status === 'Published'
//                                       ? 'bg-green-100 text-green-800'
//                                       : entry.metadata.status === 'Draft'
//                                         ? 'bg-blue-100 text-blue-800'
//                                         : 'bg-yellow-100 text-yellow-800'
//                                   }`}
//                                 >
//                                   {entry.metadata.status}
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {entry.type === 'file' ? entry.metadata.lastModifiedDate.toLocaleString() : 'N/A'}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
//                               {activeTab === 'trash' ? renderTrashActions(entry) : renderActions(entry)}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
//                             No items found in this folder.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {activeView === 'add' && (
//           <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
//               {editingEntry?.type === 'folder' ? (
//                 <> <FiFolderPlus className="mr-3 text-orange-500" /> {editingEntry?.id ? 'Edit Folder' : 'Create New Folder'} </>
//               ) : (
//                 <> <FiFilePlus className="mr-3 text-orange-500" /> {editingEntry?.id ? 'Edit File' : 'Create New File'} </>
//               )}
//             </h3>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Common input for name/title */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                     {editingEntry?.type === 'folder' ? 'Folder Name' : 'File Name'}
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={editingEntry?.name || ''}
//                     onChange={handleInputChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                     placeholder={editingEntry?.type === 'folder' ? 'e.g., My Project Folder' : 'e.g., meeting_notes.txt'}
//                   />
//                 </div>
            
//                 {/* File-specific fields */}
//                 {editingEntry?.type === 'file' && (
//                     <>
//                         <div>
//                             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Category
//                             </label>
//                             <input
//                                 type="text"
//                                 id="category"
//                                 name="category"
//                                 value={editingEntry.metadata.category}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                                 placeholder="e.g., Finance, HR, Legal"
//                             />
//                         </div>
        
//                         <div className="md:col-span-2">
//                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Description
//                             </label>
//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={editingEntry.metadata.description}
//                                 onChange={handleInputChange}
//                                 rows={4}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
//                                 placeholder="Provide a brief description of the file content..."
//                             />
//                         </div>
        
//                         <div>
//                             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Status
//                             </label>
//                             <select
//                                 id="status"
//                                 name="status"
//                                 value={editingEntry.metadata.status}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
//                             >
//                                 <option value="Draft">Draft</option>
//                                 <option value="Published">Published</option>
//                                 <option value="Archived">Archived</option>
//                             </select>
//                         </div>
        
//                         <div>
//                             <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Access Level
//                             </label>
//                             <select
//                                 id="access"
//                                 name="access"
//                                 value={editingEntry.metadata.access}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
//                             >
//                                 <option value="Private">Private</option>
//                                 <option value="Public">Public</option>
//                             </select>
//                         </div>
        
//                         <div className="md:col-span-2">
//                             <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Tags (comma separated)
//                             </label>
//                             <input
//                                 type="text"
//                                 id="tags"
//                                 name="tags"
//                                 value={editingEntry.metadata.tags.join(', ')}
//                                 onChange={handleTagChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                                 placeholder="e.g., report, finance, Q3, 2025"
//                             />
//                         </div>

//                         <div className="md:col-span-2">
//                           <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
//                               File Content (Simulated)
//                           </label>
//                           <textarea
//                               id="content"
//                               name="content"
//                               value={editingEntry.content}
//                               onChange={handleInputChange}
//                               rows={6}
//                               className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
//                               placeholder="Enter file content here..."
//                           />
//                         </div>
        
//                         <div className="md:col-span-2">
//                             <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
//                                 Attached File (Simulated)
//                             </label>
//                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                                 <div className="space-y-1 text-center">
//                                     <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
//                                     <div className="flex text-sm text-gray-600">
//                                         <label
//                                             htmlFor="file-upload"
//                                             className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
//                                         >
//                                             <span>Upload a file</span>
//                                             <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                                         </label>
//                                         <p className="pl-1">or drag and drop</p>
//                                     </div>
//                                     <p className="text-xs text-gray-500">
//                                         PNG, JPG, GIF up to 10MB
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
            
//             <div className="mt-8 flex justify-end space-x-4">
//               <button
//                 onClick={() => setActiveView('list')}
//                 className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center"
//               >
//                 <FiX className="mr-2" /> Cancel
//               </button>
//               <button
//                 onClick={() => openConfirmationModal('saveEntry')}
//                 className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
//               >
//                 <FiSave className="mr-2" /> Save
//               </button>
//             </div>
//           </div>
//         )}

//         {/* NEW: File Content View */}
//         {activeView === 'viewContent' && viewingFile && (
//             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex-grow overflow-hidden">
//                 <div className="flex items-center justify-between mb-5">
//                     <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                         <FiDocument className="mr-3 text-orange-500" /> {viewingFile.name}
//                     </h3>
//                     <button
//                         onClick={() => setActiveView('list')}
//                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center"
//                     >
//                         <FiX className="mr-2" /> Close
//                     </button>
//                 </div>
//                 <div className="border border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-y-auto">
//                     {viewingFile.fileType.startsWith('image/') ? (
//                         <img src={viewingFile.content} alt={viewingFile.name} className="max-w-full h-auto" />
//                     ) : (
//                         <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
//                             {viewingFile.content}
//                         </pre>
//                     )}
//                 </div>
//             </div>
//         )}

//       </div>
      
//       {/* Notifications */}
//       <div className="fixed top-4 right-4 z-50 space-y-2">
//         {notifications.map((notif) => (
//           <div
//             key={notif.id}
//             className={`flex items-center p-3 rounded-lg shadow-md text-white ${
//               notif.type === 'success'
//                 ? 'bg-green-500'
//                 : notif.type === 'error'
//                   ? 'bg-red-500'
//                   : notif.type === 'warning'
//                     ? 'bg-yellow-500'
//                     : 'bg-blue-500'
//             }`}
//           >
//             {notif.type === 'success' && <FiDocument className="w-5 h-5 mr-2" />}
//             {notif.type === 'error' && <FiAlertCircle className="w-5 h-5 mr-2" />}
//             {notif.type === 'warning' && <FiAlertCircle className="w-5 h-5 mr-2" />}
//             {notif.type === 'info' && <FiInfo className="w-5 h-5 mr-2" />}
//             <span>{notif.message}</span>
//             <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
//               <FiX className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <FiAlertCircle className="mr-2 text-orange-500" /> Confirmation
//             </h3>
//             <p className="text-gray-700 mb-6">{modalContent}</p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                 onClick={handleModalCancel}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
//                 onClick={handleModalConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentsManagementSystem;

import React, { useState, useEffect } from 'react';
import {
  FiFileText,
  FiUpload,
  FiFolderPlus,
  FiFilePlus,
  FiSearch,
  FiPlus,
  FiUsers,
  FiClock,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiAlertCircle,
  FiInfo,
  FiX,
  FiChevronRight,
  FiHome,
  FiBell,
  FiUser,
  FiSave,
  FiFolder,
  FiChevronDown,
  FiFile,
  FiFileText as FiDocument,
  FiList,
  FiGrid,
  FiChevronsLeft,
  FiChevronsRight,
  FiFilter,
  FiArchive,
  FiGlobe,
  FiShare2,
  FiLock, // New icon for Private
  FiFileMinus, // New icon for Draft
  FiGitMerge // Icon for the new chart tree view
} from 'react-icons/fi';

// Fix for 'webkitdirectory' type error
declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: 'true' | 'false' | '';
    mozdirectory?: 'true' | 'false' | '';
  }
}

// Custom UUID generator to avoid external dependency and TypeScript errors
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Define the interfaces for our file system structure
interface FileMetadata {
  category: string;
  description: string;
  status: 'Draft' | 'Published' | 'Archived';
  tags: string[];
  access: 'Public' | 'Private';
  creationDate: Date;
  lastModifiedDate: Date;
}

interface File {
  id: string;
  name: string;
  type: 'file';
  fileType: string; // Added to store the actual file MIME type
  content: string; // Now can hold text content or a data URL
  metadata: FileMetadata;
}

interface Folder {
  id: string;
  name: string;
  type: 'folder';
  children: FileSystemEntry[];
  isExpanded: boolean;
}

type FileSystemEntry = File | Folder;

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

// Initial dummy data for the file system
const initialFileSystem: FileSystemEntry[] = [
  {
    id: generateUUID(),
    name: 'Documents',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: generateUUID(),
        name: 'Finance',
        type: 'folder',
        isExpanded: false,
        children: [
          {
            id: generateUUID(),
            name: 'Q1_Report.txt',
            type: 'file',
            fileType: 'text/plain',
            content: 'This is the content of the Q1 financial report.',
            metadata: {
              category: 'Financial',
              description: 'Quarterly report for Q1 2025.',
              status: 'Published',
              tags: ['report', 'finance', 'Q1'],
              access: 'Public',
              creationDate: new Date(),
              lastModifiedDate: new Date(),
            },
          },
          {
            id: generateUUID(),
            name: 'Budget_Plan.txt',
            type: 'file',
            fileType: 'text/plain',
            content: 'This file contains the budget plan for the next fiscal year.',
            metadata: {
              category: 'Financial',
              description: 'Budget plan for the upcoming year.',
              status: 'Draft',
              tags: ['budget', 'planning'],
              access: 'Private',
              creationDate: new Date(),
              lastModifiedDate: new Date(),
            },
          },
        ],
      },
      {
        id: generateUUID(),
        name: 'Human Resources',
        type: 'folder',
        isExpanded: false,
        children: [],
      },
      {
        id: generateUUID(),
        name: 'Project Alpha.pdf',
        type: 'file',
        fileType: 'application/pdf',
        content: 'Project Alpha documentation.',
        metadata: {
          category: 'Projects',
          description: 'Documentation for Project Alpha.',
          status: 'Published',
          tags: ['project', 'alpha', 'documentation'],
          access: 'Public',
          creationDate: new Date(),
          lastModifiedDate: new Date(),
        },
      },
      {
        id: generateUUID(),
        name: 'Old_Contract.pdf',
        type: 'file',
        fileType: 'application/pdf',
        content: 'This is an old contract.',
        metadata: {
          category: 'Legal',
          description: 'An old contract that has been archived.',
          status: 'Archived',
          tags: ['contract', 'legal'],
          access: 'Private',
          creationDate: new Date(),
          lastModifiedDate: new Date(),
        },
      },
    ],
  },
  {
    id: generateUUID(),
    name: 'Images',
    type: 'folder',
    isExpanded: false,
    children: [],
  },
];

interface FilterState {
  type: 'all' | 'file' | 'folder';
  status: 'all' | 'Draft' | 'Published' | 'Archived';
  category: string;
  access: 'all' | 'Public' | 'Private';
}

const DocumentsManagementSystem: React.FC = () => {
  const [fileSystem, setFileSystem] = useState<FileSystemEntry[]>(initialFileSystem);
  const [currentPath, setCurrentPath] = useState<string[]>(['Documents']);
  const [activeView, setActiveView] = useState<'list' | 'add' | 'viewContent'>('list');
  const [editingEntry, setEditingEntry] = useState<File | Folder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [viewingFile, setViewingFile] = useState<File | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'chart'>('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    category: '',
    access: 'all'
  });

  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private' | 'draft' | 'archive' | 'trash'>('all');
  const [trashedEntries, setTrashedEntries] = useState<FileSystemEntry[]>([]);

  // Helper function to find a folder by path, returning its children array
  const findFolderChildrenByPath = (path: string[], entries: FileSystemEntry[]): FileSystemEntry[] | null => {
    let currentEntries: FileSystemEntry[] = entries;
    if (path.length === 0) return currentEntries;

    for (const name of path) {
      const folder = currentEntries.find(
        (entry) => entry.type === 'folder' && entry.name === name
      ) as Folder | undefined;
      if (!folder) return null;
      currentEntries = folder.children;
    }
    return currentEntries;
  };
  
  // A new helper function to find an entry (file or folder) and its parent's children array
  const findEntryAndParent = (entries: FileSystemEntry[], path: string[], entryId: string, parentChildren: FileSystemEntry[] | null = null): { entry: FileSystemEntry | null, parentChildren: FileSystemEntry[] | null } => {
    const currentEntries = path.length === 0 ? entries : findFolderChildrenByPath(path, entries);
    if (!currentEntries) return { entry: null, parentChildren: null };
    
    const entry = currentEntries.find(e => e.id === entryId);
    if (entry) {
      return { entry, parentChildren: currentEntries };
    }

    for (const subEntry of currentEntries) {
      if (subEntry.type === 'folder') {
        const result = findEntryAndParent(subEntry.children, [], entryId, subEntry.children);
        if (result.entry) {
          return result;
        }
      }
    }
    
    return { entry: null, parentChildren: null };
  };

  // NEW: Helper to flatten the file system recursively
  const flattenFileSystem = (entries: FileSystemEntry[]): FileSystemEntry[] => {
    let allEntries: FileSystemEntry[] = [];
    entries.forEach(entry => {
      allEntries.push(entry);
      if (entry.type === 'folder') {
        allEntries = allEntries.concat(flattenFileSystem(entry.children));
      }
    });
    return allEntries;
  };

  // NEW: Helper to update a file/folder deep in the tree immutably
  const updateEntryInSystem = (entries: FileSystemEntry[], entryId: string, updateFn: (entry: FileSystemEntry) => FileSystemEntry): FileSystemEntry[] => {
    return entries.map(entry => {
      if (entry.id === entryId) {
        return updateFn(entry);
      }
      if (entry.type === 'folder') {
        return {
          ...entry,
          children: updateEntryInSystem(entry.children, entryId, updateFn)
        };
      }
      return entry;
    });
  };

  // NEW: Handler for special tab navigation
  const handleTabNavigation = (tab: 'all' | 'public' | 'private' | 'draft' | 'archive' | 'trash') => {
    setActiveTab(tab);
    // Reset path when switching to a special tab view
    if (tab !== 'all') {
      setCurrentPath([]);
    }
    setActiveView('list');
    setSearchQuery('');
  };

  // Notification management
  const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Modal handlers
  const openConfirmationModal = (actionType: string, entry?: File | Folder) => {
    let content = '';
    let action: (() => void) | null = null;
    
    switch (actionType) {
      case 'deleteEntry':
        content = `Are you sure you want to delete "${entry?.name}"? It will be moved to trash.`;
        action = () => handleDeleteEntry(entry!);
        break;
      case 'saveEntry':
        content = 'Are you sure you want to save these changes?';
        action = handleSaveEntry;
        break;
      case 'permanentDelete':
        content = `Are you sure you want to permanently delete "${entry?.name}"? This action cannot be undone.`;
        action = () => handlePermanentDelete(entry!);
        break;
      case 'restoreEntry':
        content = `Are you sure you want to restore "${entry?.name}"? It will be moved back to its original location (or root).`;
        action = () => handleRestoreEntry(entry!);
        break;
      default:
        content = 'Are you sure you want to proceed?';
        action = null;
    }
    
    setModalContent(content);
    setModalAction(() => action);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalAction) {
      modalAction();
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalContent('');
    setModalAction(null);
    addNotification('Action cancelled.', 'info');
  };

  // Entry handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!editingEntry) return;

    if (editingEntry.type === 'file') {
      if (name === 'name' || name === 'content') {
        setEditingEntry({ ...editingEntry, [name]: value });
      } else {
        setEditingEntry({
          ...editingEntry,
          metadata: {
            ...editingEntry.metadata,
            [name]: value,
          },
        });
      }
    } else {
      setEditingEntry({ ...editingEntry, [name]: value });
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingEntry?.type === 'file') {
      setEditingEntry({
        ...editingEntry,
        metadata: {
          ...editingEntry.metadata,
          tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag),
        },
      });
    }
  };

  // This is the core function for adding/updating entries immutably
  const updateFileSystem = (entries: FileSystemEntry[], path: string[], newEntry: FileSystemEntry): FileSystemEntry[] => {
    if (path.length === 0) {
      const existingEntryIndex = entries.findIndex(e => e.id === newEntry.id);
      if (existingEntryIndex !== -1) {
        return entries.map(e => e.id === newEntry.id ? newEntry : e);
      }
      return [...entries, newEntry];
    }
  
    const [currentPathName, ...restOfPath] = path;
    return entries.map(entry => {
      if (entry.type === 'folder' && entry.name === currentPathName) {
        const updatedChildren = updateFileSystem(entry.children, restOfPath, newEntry);
        return { ...entry, children: updatedChildren };
      }
      return entry;
    });
  };

  const deleteEntryFromSystem = (entries: FileSystemEntry[], path: string[], idToDelete: string): FileSystemEntry[] => {
    if (path.length === 0) {
      return entries.filter(entry => entry.id !== idToDelete);
    }

    const [currentPathName, ...restOfPath] = path;
    return entries.map(entry => {
      if (entry.type === 'folder' && entry.name === currentPathName) {
        const updatedChildren = deleteEntryFromSystem(entry.children, restOfPath, idToDelete);
        return { ...entry, children: updatedChildren };
      }
      return entry;
    });
  };

  const handleSaveEntry = () => {
    if (!editingEntry) {
      addNotification('Error: No entry to save.', 'error');
      setShowModal(false);
      return;
    }

    const parentPath = currentPath;
    const isNewEntry = !editingEntry.id;
    
    const finalEntry = isNewEntry
      ? { ...editingEntry, id: generateUUID() }
      : editingEntry;

    const entryToSave = (finalEntry.type === 'file')
      ? {
        ...finalEntry,
        metadata: {
          ...finalEntry.metadata,
          creationDate: isNewEntry ? new Date() : finalEntry.metadata.creationDate,
          lastModifiedDate: new Date(),
        }
      }
      : finalEntry;

    setFileSystem(prevFs => updateFileSystem(prevFs, parentPath, entryToSave));
    
    addNotification(
      `Entry "${entryToSave.name}" ${isNewEntry ? 'added' : 'updated'} successfully!`,
      'success'
    );
    setEditingEntry(null);
    setActiveView('list');
    setShowModal(false);
  };
  
  // NEW: Move entry to trash instead of permanent deletion
  const handleDeleteEntry = (entryToDelete: File | Folder) => {
    setFileSystem(prevFs => {
      const parentPath = currentPath;
      const updatedFs = deleteEntryFromSystem(prevFs, parentPath, entryToDelete.id);
      return updatedFs;
    });
    setTrashedEntries(prev => [...prev, entryToDelete]);
    addNotification(`Entry "${entryToDelete.name}" moved to trash.`, 'info');
  };

  // NEW: Restore entry from trash
  const handleRestoreEntry = (entryToRestore: File | Folder) => {
    setTrashedEntries(prev => prev.filter(entry => entry.id !== entryToRestore.id));
    setFileSystem(prevFs => updateFileSystem(prevFs, [], entryToRestore));
    addNotification(`Entry "${entryToRestore.name}" restored successfully!`, 'success');
  };

  // NEW: Permanent delete from trash
  const handlePermanentDelete = (entryToDelete: File | Folder) => {
    setTrashedEntries(prev => prev.filter(entry => entry.id !== entryToDelete.id));
    addNotification(`Entry "${entryToDelete.name}" permanently deleted.`, 'error');
  };

  // NEW: Actions to change status and access
  const handleFileStatusChange = (file: File, newStatus: FileMetadata['status']) => {
    setFileSystem(prevFs => updateEntryInSystem(prevFs, file.id, (entry) => {
      if (entry.type === 'file') {
        return {
          ...entry,
          metadata: {
            ...entry.metadata,
            status: newStatus,
            lastModifiedDate: new Date(),
          }
        };
      }
      return entry;
    }));
    addNotification(`File "${file.name}" status changed to "${newStatus}".`, 'success');
  };

  const handleFileAccessChange = (file: File, newAccess: FileMetadata['access']) => {
    setFileSystem(prevFs => updateEntryInSystem(prevFs, file.id, (entry) => {
      if (entry.type === 'file') {
        return {
          ...entry,
          metadata: {
            ...entry.metadata,
            access: newAccess,
            lastModifiedDate: new Date(),
          }
        };
      }
      return entry;
    }));
    addNotification(`File "${file.name}" access changed to "${newAccess}".`, 'success');
  };


  const handleNavigateToFolder = (path: string[]) => {
    setCurrentPath(path);
    setActiveTab('all'); // Reset special tab view
    setActiveView('list');
    setSearchQuery('');
  };

  // CORRECTED toggleFolderExpansion logic
  const toggleFolderExpansion = (path: string[]) => {
    setFileSystem(prevFs => {
      const toggleRecursive = (entries: FileSystemEntry[], currentPath: string[]): FileSystemEntry[] => {
        if (currentPath.length === 0) return entries;
        
        const [targetName, ...restOfPath] = currentPath;
        return entries.map(entry => {
          if (entry.type === 'folder' && entry.name === targetName) {
            return {
              ...entry,
              isExpanded: restOfPath.length === 0 ? !entry.isExpanded : entry.isExpanded,
              children: toggleRecursive(entry.children, restOfPath),
            };
          }
          return entry;
        });
      };
      return toggleRecursive(prevFs, path);
    });
  };

  // NEW: Handler to view a file's content
  const handleViewFileContent = (file: File) => {
      setViewingFile(file);
      setActiveView('viewContent');
  };

  // NEW: Handler for direct file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target?.result as string;

      const newFile: File = {
        id: generateUUID(),
        name: file.name,
        type: 'file',
        fileType: file.type || 'unknown',
        content: fileContent,
        metadata: {
          category: 'Uploaded',
          description: `Uploaded file: ${file.name}`,
          status: 'Draft',
          tags: [file.type.split('/')[0], 'upload'],
          access: 'Private',
          creationDate: new Date(),
          lastModifiedDate: new Date(),
        },
      };

      setFileSystem(prevFs => updateFileSystem(prevFs, currentPath, newFile));
      addNotification(`File "${file.name}" uploaded successfully!`, 'success');
    };

    if (file.type.startsWith('text/')) {
        reader.readAsText(file);
    } else {
        reader.readAsDataURL(file);
    }
  };

  // NEW: Handler for folder uploads
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFolder: Folder = {
      id: generateUUID(),
      name: `Uploaded Folder (${new Date().toLocaleString()})`,
      type: 'folder',
      isExpanded: true,
      children: [],
    };

    const newChildren: FileSystemEntry[] = [];
    Array.from(files).forEach((file: any) => {
      const newFile: File = {
        id: generateUUID(),
        name: file.name,
        type: 'file',
        fileType: file.type || 'unknown',
        content: `Simulated content for uploaded file: ${file.webkitRelativePath || file.name}`,
        metadata: {
          category: 'Uploaded',
          description: `Uploaded file: ${file.name}`,
          status: 'Draft',
          tags: [file.type.split('/')[0], 'upload'],
          access: 'Private',
          creationDate: new Date(),
          lastModifiedDate: new Date(),
        },
      };
      newChildren.push(newFile);
    });

    newFolder.children = newChildren;
    setFileSystem(prevFs => updateFileSystem(prevFs, currentPath, newFolder));
    addNotification(`Folder uploaded successfully!`, 'success');
  };

  // NEW: Drag and Drop functionality
  const handleDragStart = (e: React.DragEvent, entryId: string) => {
    e.dataTransfer.setData('entryId', entryId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetPath: string[]) => {
    e.preventDefault();
    const entryId = e.dataTransfer.getData('entryId');

    // Find the entry being moved and its parent
    const { entry, parentChildren } = findEntryAndParent(fileSystem, [], entryId);
    if (!entry || !parentChildren) {
      addNotification('Error: Could not find the item to move.', 'error');
      return;
    }
    
    // Find the target folder's children array
    const targetFolderChildren = findFolderChildrenByPath(targetPath, fileSystem);
    if (!targetFolderChildren) {
      addNotification('Error: Could not find the destination folder.', 'error');
      return;
    }
    
    // Check if the entry is being dropped into its own folder
    if (parentChildren === targetFolderChildren) {
      addNotification('Item is already in this folder.', 'info');
      return;
    }
    
    // Check if a folder is being moved into one of its own sub-folders
    if (entry.type === 'folder' && targetPath.join('/').startsWith([...currentPath, entry.name].join('/'))) {
        addNotification('Cannot move a folder into its own subdirectory.', 'error');
        return;
    }

    // Check for name collision in the target folder
    const nameCollision = targetFolderChildren.some(e => e.name === entry.name && e.id !== entryId);
    if (nameCollision) {
        addNotification(`An item with the name "${entry.name}" already exists here.`, 'error');
        return;
    }
    
    setFileSystem(prevFs => {
        // 1. Remove the entry from its original location
        const newFsAfterDeletion = deleteEntryFromSystem(prevFs, currentPath, entryId);
        
        // 2. Add the entry to the new location
        const newFsAfterAddition = updateFileSystem(newFsAfterDeletion, targetPath, entry);
        
        return newFsAfterAddition;
    });

    addNotification(`"${entry.name}" moved successfully!`, 'success');
    setCurrentPath(targetPath);
  };

  // Render the tree view recursively with drag-and-drop
  const renderTreeView = (entries: FileSystemEntry[], path: string[]) => {
    return entries.map(entry => (
      <div key={entry.id} className="ml-4">
        {entry.type === 'folder' ? (
          <div 
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, [...path, entry.name])}
            className="rounded-md"
          >
            <div
              className={`flex items-center cursor-pointer p-1 rounded-md transition-colors ${
                currentPath.join('/') === [...path, entry.name].join('/') && activeTab === 'all' ? 'bg-orange-600 hover:bg-orange-700 text-white font-semibold' : 'hover:bg-gray-700'
              }`}
              onClick={() => {
                toggleFolderExpansion([...path, entry.name]);
                handleNavigateToFolder([...path, entry.name]);
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, entry.id)}
            >
              {entry.isExpanded ? <FiChevronDown className="mr-2" /> : <FiChevronRight className="mr-2" />}
              <FiFolder className="text-gray-400 mr-2" />
              <span>{entry.name}</span>
            </div>
            {entry.isExpanded && entry.children.length > 0 && (
              <div className="pl-2">
                {renderTreeView(entry.children, [...path, entry.name])}
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center p-1 rounded-md hover:bg-gray-700 transition-colors cursor-pointer`}
            onClick={() => handleViewFileContent(entry as File)}
            draggable
            onDragStart={(e) => handleDragStart(e, entry.id)}
          >
            <FiDocument className="text-gray-400 mr-2 ml-4" />
            <span>{entry.name}</span>
          </div>
        )}
      </div>
    ));
  };


  // Filter current folder's content for search & filters
  const getEntriesToDisplay = () => {
    switch(activeTab) {
      case 'public':
        return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.access === 'Public');
      case 'private':
        return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.access === 'Private');
      case 'draft':
        return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.status === 'Draft');
      case 'archive':
        return flattenFileSystem(fileSystem).filter(entry => entry.type === 'file' && entry.metadata.status === 'Archived');
      case 'trash':
        return trashedEntries;
      case 'all':
      default:
        return findFolderChildrenByPath(currentPath, fileSystem) || [];
    }
  };

  const entriesToFilter = getEntriesToDisplay();

  const filteredEntries = entriesToFilter.filter(entry => {
    const matchesSearch = 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.type === 'file' && (
        entry.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ));

    const matchesType = filters.type === 'all' || entry.type === filters.type;
    
    const matchesStatus = 
      filters.status === 'all' ||
      (entry.type === 'file' && entry.metadata.status === filters.status);

    const matchesCategory = 
      filters.category === '' ||
      (entry.type === 'file' && entry.metadata.category.toLowerCase().includes(filters.category.toLowerCase()));

    const matchesAccess = 
      filters.access === 'all' ||
      (entry.type === 'file' && entry.metadata.access === filters.access);
      
    return matchesSearch && matchesType && matchesStatus && matchesCategory && matchesAccess;
  });

  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'public':
        return 'Public Documents';
      case 'private':
        return 'Private Documents';
      case 'draft':
        return 'Draft Documents';
      case 'archive':
        return 'Archive';
      case 'trash':
        return 'Trash';
      case 'all':
      default:
        return `Contents of "${currentPath.length > 0 ? currentPath[currentPath.length-1] : 'Root'}"`;
    }
  };

  const renderActions = (entry: FileSystemEntry) => {
    if (entry.type === 'folder') {
        return (
            <div className="flex space-x-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingEntry(entry);
                        setActiveView('add');
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Update Folder"
                >
                    <FiEdit className="inline-block" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        openConfirmationModal('deleteEntry', entry);
                    }}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Folder"
                >
                    <FiTrash2 className="inline-block" />
                </button>
            </div>
        );
    }

    // Actions for a file
    const file = entry as File;

    const actionButtons = [];
    
    // Status Actions
    if (file.metadata.status !== 'Published') {
        actionButtons.push(
            <button
                key="publish"
                onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Published'); }}
                className="text-green-600 hover:text-green-900"
                title="Publish"
            >
                <FiGlobe className="inline-block" />
            </button>
        );
    }
    if (file.metadata.status !== 'Archived') {
        actionButtons.push(
            <button
                key="archive"
                onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Archived'); }}
                className="text-yellow-600 hover:text-yellow-900"
                title="Archive"
            >
                <FiArchive className="inline-block" />
            </button>
        );
    }
    if (file.metadata.status !== 'Draft') {
        actionButtons.push(
            <button
                key="draft"
                onClick={(e) => { e.stopPropagation(); handleFileStatusChange(file, 'Draft'); }}
                className="text-blue-600 hover:text-blue-900"
                title="Move to Draft"
            >
                <FiFileMinus className="inline-block" />
            </button>
        );
    }

    // Access Actions
    if (file.metadata.access !== 'Public') {
        actionButtons.push(
            <button
                key="share"
                onClick={(e) => { e.stopPropagation(); handleFileAccessChange(file, 'Public'); }}
                className="text-purple-600 hover:text-purple-900"
                title="Share (Public)"
            >
                <FiShare2 className="inline-block" />
            </button>
        );
    }
    if (file.metadata.access !== 'Private') {
        actionButtons.push(
            <button
                key="private"
                onClick={(e) => { e.stopPropagation(); handleFileAccessChange(file, 'Private'); }}
                className="text-orange-600 hover:text-orange-900"
                title="Make Private"
            >
                <FiLock className="inline-block" />
            </button>
        );
    }

    // Standard Actions
    actionButtons.push(
        <button
            key="edit"
            onClick={(e) => { e.stopPropagation(); setEditingEntry(file); setActiveView('add'); }}
            className="text-indigo-600 hover:text-indigo-900"
            title="Update File"
        >
            <FiEdit className="inline-block" />
        </button>
    );

    actionButtons.push(
        <button
            key="delete"
            onClick={(e) => { e.stopPropagation(); openConfirmationModal('deleteEntry', file); }}
            className="text-red-600 hover:text-red-900"
            title="Delete File"
        >
            <FiTrash2 className="inline-block" />
        </button>
    );

    return <div className="flex space-x-2">{actionButtons}</div>;
};

const renderTrashActions = (entry: FileSystemEntry) => {
    return (
        <div className="flex space-x-2">
            <button
                onClick={(e) => { e.stopPropagation(); openConfirmationModal('restoreEntry', entry); }}
                className="text-green-600 hover:text-green-900"
                title="Restore"
            >
                <FiSave className="inline-block" />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); openConfirmationModal('permanentDelete', entry); }}
                className="text-red-600 hover:text-red-900"
                title="Delete Permanently"
            >
                <FiTrash2 className="inline-block" />
            </button>
        </div>
    );
};

  // NEW: Recursive function for the Chart Tree View
  const renderChartTreeView = (entries: FileSystemEntry[], path: string[]) => {
    return (
        <ul className="space-y-2">
            {entries.map((entry, index) => (
                <li key={entry.id} className="relative">
                    {/* The connector line */}
                    <div className={`absolute top-0 left-0 w-6 h-full ${index === entries.length - 1 ? '' : 'border-l border-gray-300'}`}></div>
                    
                    <div className="flex items-center space-x-2 group relative">
                        {/* The horizontal line */}
                        <div className="absolute top-1/2 -left-2 w-4 h-px bg-gray-300"></div>

                        <div 
                            className="flex-grow flex items-center space-x-2 cursor-pointer bg-gray-50 hover:bg-gray-100 p-2 rounded-md transition-colors"
                            onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...path, entry.name]) : handleViewFileContent(entry as File)}
                        >
                            {entry.type === 'folder' ? <FiFolder className="text-orange-500" /> : <FiDocument className="text-blue-500" />}
                            <span>{entry.name}</span>
                        </div>
                    </div>
                    {entry.type === 'folder' && entry.children.length > 0 && (
                        <div className="pl-6">
                            {renderChartTreeView(entry.children, [...path, entry.name])}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* Sidebar with Tree View */}
      <div className={`bg-gray-800 text-white p-4 shadow-lg flex-col transform transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-80 flex' : 'w-0 hidden'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FiHome className="text-orange-500 w-6 h-6" />
            <span className="text-xl font-bold">File Explorer</span>
          </div>
        </div>

        {/* NEW: Special Tabs Section */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Views</h4>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleTabNavigation('all')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'all' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiFolder className="mr-2" /> My Drive
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabNavigation('draft')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'draft' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiFileMinus className="mr-2" /> Drafts
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabNavigation('private')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'private' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiLock className="mr-2" /> Private
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabNavigation('public')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'public' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiShare2 className="mr-2" /> Public
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabNavigation('archive')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'archive' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiArchive className="mr-2" /> Archive
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabNavigation('trash')}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${activeTab === 'trash' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'hover:bg-gray-700'}`}
              >
                <FiTrash2 className="mr-2" /> Trash
              </button>
            </li>
          </ul>
        </div>

        <div className="overflow-y-auto flex-grow">
          {activeTab === 'all' && (
            <>
              <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Folders</h4>
              <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, [])} className="min-h-12 rounded-md">
                {renderTreeView(fileSystem, [])}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white p-2 rounded-r-lg shadow-lg"
      >
        {isSidebarOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
      </button>

      {/* Main Content Area */}
      <div className={`flex-grow p-8 bg-gray-50 flex flex-col rounded-t-xl transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0' : 'ml-12'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiDocument className="mr-3 text-orange-500" />
            <div className="flex items-center text-xl font-semibold text-gray-600">
                <button className="flex items-center hover:text-orange-600" onClick={() => handleNavigateToFolder([])}>
                  <FiHome className="mr-1" /> Root
                </button>
                {activeTab === 'all' && currentPath.map((folderName, index) => (
                  <div key={index} className="flex items-center">
                    <FiChevronRight className="mx-1" />
                    <button
                      className="hover:text-orange-600"
                      onClick={() => handleNavigateToFolder(currentPath.slice(0, index + 1))}
                    >
                      {folderName}
                    </button>
                  </div>
                ))}
            </div>
          </h2>
          <div className="flex space-x-4">
            {activeView === 'list' && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search current folder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md"
            >
              <FiFilter className="mr-2" /> Filters
            </button>
            <label htmlFor="file-upload" className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md">
                <FiUpload className="mr-2" /> Upload File
            </label>
            <input id="file-upload" type="file" onChange={handleFileUpload} className="sr-only" />

            <label htmlFor="folder-upload" className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center shadow-md">
                <FiUpload className="mr-2" /> Upload Folder
            </label>
            <input id="folder-upload" type="file" onChange={handleFolderUpload} className="sr-only" multiple webkitdirectory="" />

            <button
              onClick={() => {
                setEditingEntry({
                  id: '',
                  name: '',
                  type: 'file',
                  fileType: '',
                  content: '',
                  metadata: {
                    category: '',
                    description: '',
                    status: 'Draft',
                    tags: [],
                    access: 'Private',
                    creationDate: new Date(),
                    lastModifiedDate: new Date(),
                  }
                });
                setActiveView('add');
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
            >
              <FiFilePlus className="mr-2" /> Add New File
            </button>
            <button
              onClick={() => {
                setEditingEntry({
                  id: '',
                  name: '',
                  type: 'folder',
                  children: [],
                  isExpanded: false
                });
                setActiveView('add');
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
            >
              <FiFolderPlus className="mr-2" /> Add New Folder
            </button>
          </div>
        </div>
        
        {/* Powerful Filter Section */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
            <h4 className="text-lg font-semibold mb-4">Advanced Filters</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | 'file' | 'folder' })}
                >
                  <option value="all">All</option>
                  <option value="file">File</option>
                  <option value="folder">Folder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | 'Draft' | 'Published' | 'Archived' })}
                >
                  <option value="all">All</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Access</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  value={filters.access}
                  onChange={(e) => setFilters({ ...filters, access: e.target.value as 'all' | 'Public' | 'Private' })}
                >
                  <option value="all">All</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="e.g., Finance"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* View Toggle and dynamic content */}
        {activeView === 'list' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {getHeaderTitle()}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                  title="List View"
                >
                  <FiList className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'card' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                  title="Card View"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'chart' ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                  title="Chart Tree View"
                >
                  <FiGitMerge className="w-5 h-5" />
                </button>
              </div>
            </div>

            {viewMode === 'chart' ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">File System Hierarchy</h3>
                {renderChartTreeView(fileSystem, [])}
              </div>
            ) : viewMode === 'card' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
                      onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...currentPath, entry.name]) : handleViewFileContent(entry as File)}
                      draggable={activeTab === 'all'}
                      onDragStart={(e) => activeTab === 'all' && handleDragStart(e, entry.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => entry.type === 'folder' && handleDrop(e, [...currentPath, entry.name])}
                    >
                      <div className="flex items-center justify-between mb-4">
                        {entry.type === 'folder' ? (
                          <FiFolder className="w-8 h-8 text-orange-500" />
                        ) : (
                          <FiDocument className="w-8 h-8 text-blue-500" />
                        )}
                        {activeTab === 'trash' ? renderTrashActions(entry) : renderActions(entry)}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-800 truncate">{entry.name}</h4>
                      {entry.type === 'file' && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 truncate">{entry.metadata.description || 'No description'}</p>
                          <span
                            className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              entry.metadata.status === 'Published'
                                ? 'bg-green-100 text-green-800'
                                : entry.metadata.status === 'Draft'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {entry.metadata.status}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    No items found in this folder.
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Modified
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredEntries.length > 0 ? (
                        filteredEntries.map((entry) => (
                          <tr key={entry.id}
                            draggable={activeTab === 'all'}
                            onDragStart={(e) => activeTab === 'all' && handleDragStart(e, entry.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => entry.type === 'folder' && handleDrop(e, [...currentPath, entry.name])}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap cursor-pointer"
                                onClick={() => entry.type === 'folder' ? handleNavigateToFolder([...currentPath, entry.name]) : handleViewFileContent(entry as File)}>
                              <div className="flex items-center">
                                {entry.type === 'folder' ? (
                                    <FiFolder className="text-gray-400 mr-2" />
                                ) : (
                                    <FiDocument className="text-gray-400 mr-2" />
                                )}
                                <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                              {entry.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {entry.type === 'file' && (
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    entry.metadata.status === 'Published'
                                      ? 'bg-green-100 text-green-800'
                                      : entry.metadata.status === 'Draft'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                  }`}
                                >
                                  {entry.metadata.status}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.type === 'file' ? entry.metadata.lastModifiedDate.toLocaleString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                              {activeTab === 'trash' ? renderTrashActions(entry) : renderActions(entry)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                            No items found in this folder.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeView === 'add' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              {editingEntry?.type === 'folder' ? (
                <> <FiFolderPlus className="mr-3 text-orange-500" /> {editingEntry?.id ? 'Edit Folder' : 'Create New Folder'} </>
              ) : (
                <> <FiFilePlus className="mr-3 text-orange-500" /> {editingEntry?.id ? 'Edit File' : 'Create New File'} </>
              )}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Common input for name/title */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {editingEntry?.type === 'folder' ? 'Folder Name' : 'File Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editingEntry?.name || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder={editingEntry?.type === 'folder' ? 'e.g., My Project Folder' : 'e.g., meeting_notes.txt'}
                  />
                </div>
            
                {/* File-specific fields */}
                {editingEntry?.type === 'file' && (
                    <>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={editingEntry.metadata.category}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="e.g., Finance, HR, Legal"
                            />
                        </div>
        
                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={editingEntry.metadata.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Provide a brief description of the file content..."
                            />
                        </div>
        
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={editingEntry.metadata.status}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
        
                        <div>
                            <label htmlFor="access" className="block text-sm font-medium text-gray-700 mb-1">
                                Access Level
                            </label>
                            <select
                                id="access"
                                name="access"
                                value={editingEntry.metadata.access}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
                            >
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
        
                        <div className="md:col-span-2">
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={editingEntry.metadata.tags.join(', ')}
                                onChange={handleTagChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="e.g., report, finance, Q3, 2025"
                            />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                              File Content (Simulated)
                          </label>
                          <textarea
                              id="content"
                              name="content"
                              value={editingEntry.content}
                              onChange={handleInputChange}
                              rows={6}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Enter file content here..."
                          />
                        </div>
        
                        <div className="md:col-span-2">
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                                Attached File (Simulated)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setActiveView('list')}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center"
              >
                <FiX className="mr-2" /> Cancel
              </button>
              <button
                onClick={() => openConfirmationModal('saveEntry')}
                className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors flex items-center shadow-md"
              >
                <FiSave className="mr-2" /> Save
              </button>
            </div>
          </div>
        )}

        {/* NEW: File Content View */}
        {activeView === 'viewContent' && viewingFile && (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex-grow overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <FiDocument className="mr-3 text-orange-500" /> {viewingFile.name}
                    </h3>
                    <button
                        onClick={() => setActiveView('list')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center"
                    >
                        <FiX className="mr-2" /> Close
                    </button>
                </div>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-y-auto">
                    {viewingFile.fileType.startsWith('image/') ? (
                        <img src={viewingFile.content} alt={viewingFile.name} className="max-w-full h-auto" />
                    ) : (
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                            {viewingFile.content}
                        </pre>
                    )}
                </div>
            </div>
        )}

      </div>
      
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center p-3 rounded-lg shadow-md text-white ${
              notif.type === 'success'
                ? 'bg-green-500'
                : notif.type === 'error'
                  ? 'bg-red-500'
                  : notif.type === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
            }`}
          >
            {notif.type === 'success' && <FiDocument className="w-5 h-5 mr-2" />}
            {notif.type === 'error' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'warning' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'info' && <FiInfo className="w-5 h-5 mr-2" />}
            <span>{notif.message}</span>
            <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertCircle className="mr-2 text-orange-500" /> Confirmation
            </h3>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsManagementSystem;