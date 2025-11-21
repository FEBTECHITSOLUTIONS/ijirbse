import React, { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { updateArticleStatus } from "../../api/adminApi";
import { IoCaretUpCircleOutline } from "react-icons/io5";
const UploadedArticlesTable = ({ articles, loading, onStatusUpdated , handlePublishArticle }) => {
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const statuses = ["submitted", "under_review", "accepted", "rejected"];

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id); // start loading state
    setActiveMenu(null); // immediately close dropdown
    try {
      const res = await updateArticleStatus(id, status);
      if (res.status < 300) {
        toast.success(`Status updated to ${status.replace("_", " ")} successfully!`);
        onStatusUpdated && onStatusUpdated();
      } else {
        toast.error(res.data?.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating status.");
    } finally {
      setUpdatingId(null); // stop loading
    }
  };

  if (loading) return <div>Loading articles...</div>;

  return (
    <div className="bg-white rounded-xl shadow relative w-fit">
      <Toaster position="top-center" />
      <table className="min-w-fit text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr className="">
            <th className="p-3 text-left">Publish</th>
            <th className="p-3 text-center">Author</th>
            <th className="p-3 text-left">Affiliation</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-center flex gap-1"><FiFileText />File</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Submitted At</th>
            <th className="p-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                No uploaded articles found
              </td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article._id} className="border-b hover:bg-gray-50 relative text-center">
                <td className="p-3"><IoCaretUpCircleOutline  onClick={()=>{handlePublishArticle(article._id)}} className={`cursor-pointer text-xl ${article.published ? 'text-green-700' : 'text-amber-600'}`}/></td>
                <td className="p-3">{article.authorName}</td>
                <td className="p-3">{article.affiliation}</td>
                <td className="p-3">{article.email}</td>
                <td className="p-3 font-medium">{article.articleTitle}</td>
                <td className="p-3 flex items-center gap-2">
                  
                  <a
                    href={`https://api.ijirbse.com${article.uploadedManuscriptMetaData?.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline "
                  >
                    {article.uploadedManuscriptMetaData?.originalName}
                  </a>
                </td>
               <td className="p-3 capitalize">
  {updatingId === article._id ? (
    <span className="text-gray-400 italic">updating...</span>
  ) : (
    <span className=" flex flex-col">
      {article.status}
      {article.published ? (
        <span className="ml-2 text-green-600 font-medium">(Published)</span>
      ):  <span className="ml-2 text-amber-600 font-medium">(Unpublished)</span>}
    </span>
  )}
</td>

                <td className="p-3">
                  {new Date(article.submittedAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === article._id ? null : article._id)
                    }
                    className="text-gray-600 hover:text-black p-2"
                  >
                    <CiMenuKebab size={18} />
                  </button>

                  {/* Dropdown */}
                  {activeMenu === article._id && (
                    <div className="absolute right-6 top-10 bg-white shadow-lg rounded-lg z-10 border border-gray-100 w-44">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(article._id, status)}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 capitalize ${
                            status === article.status
                              ? "bg-blue-50 text-blue-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {status.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedArticlesTable;
