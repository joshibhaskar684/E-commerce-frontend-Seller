"use client";


export default function UserCard({user}) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-background text-foreground rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-500 p-4">
          <h2 className="text-white text-lg font-semibold truncate">
            {user?.name}
          </h2>
          <p className="text-sm text-white/80">{user?.role}</p>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Email</span>
            <span className="text-sm font-medium break-all">
              {user?.email}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Mobile</span>
            <span className="text-sm font-medium">
              {user?.mobileno}
            </span>
          </div>

        </div>

        {/* Footer */}
        {/* <div className="flex justify-end gap-2 p-3 border-t">
          <button className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            View
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600">
            Edit
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-orange-400 text-white hover:bg-orange-500">
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
}