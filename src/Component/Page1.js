import { useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";

export default function FollowUps() {
  const [aiManaged, setAiManaged] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
     

      {/* Main Content */}
      <main className="flex-1 p-6">
        

        <p className="text-gray-600 mb-4">Configure automated follow-ups for customers.</p>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Customer Follow Ups</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Referred Follow Ups</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">Global Strategy</button>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <input type="checkbox" checked={aiManaged} onChange={() => setAiManaged(!aiManaged)} />
            <span>Let AI manage follow-ups</span>
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Step 1</h3>
            <label className="block mb-2">Method</label>
            <select className="w-full p-2 border rounded">
              <option>Email</option>
              <option>SMS</option>
            </select>

            <label className="block mt-4 mb-2">Wait Duration</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="24 hours" />

            <label className="block mt-4 mb-2">Message</label>
            <textarea className="w-full p-2 border rounded" placeholder="Type your message..." />

            <button className="flex items-center space-x-2 mt-4 text-blue-600">
              <BsPlus /> <span>Add Step</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
