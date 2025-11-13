import React, { useEffect, useState } from "react";
import UploadedArticlesTable from "../../components/admin/UploadedArticlesTable";
import { getAllUploadedArticles } from "../../api/adminApi";
import PublishArticle from "./PublishArticle";

const UploadedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishArticleOpen , setPublishArticleOpen] = useState(false);
  const [articleId , setArticleId] = useState()
  const fetchArticles = async () => { 
    setLoading(true);
    const data = await getAllUploadedArticles();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePublishArticle = (id) =>{
    setPublishArticleOpen(!publishArticleOpen)
    setArticleId(id)
  }
  const closePublishArticle = ()=>{
    setPublishArticleOpen(!publishArticleOpen)
    fetchArticles();
  }
  return (
    <div className="p-6 max-h-screen overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6">Uploaded Articles</h2>
      <UploadedArticlesTable
        articles={articles}
        loading={loading}
        onStatusUpdated={fetchArticles}
        handlePublishArticle={handlePublishArticle}
      />
      {publishArticleOpen && 
      <div className=" absolute top-20 right-[50%] ">
        <PublishArticle  articleId={articleId} closePublishArticle={closePublishArticle}/>
      </div>
      }
    </div>
  );
};

export default UploadedArticles;
