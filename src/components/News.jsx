import React from "react";
import "./News.css";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NewsModel from "./NewsModel";
import noimg from "../assets/noimg.jpg";
const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];
const News = () => {
  const [headline, setheadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showModel, setShowModel] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModel(true);
  };
  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=164e0d3e188b59990725ae1055dbeeaf`;
      const response = await Axios.get(url);
      const fetchedNews = response.data.articles;
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noimg;
        }
      });
      setNews(fetchedNews.slice(1, 7));
      setheadline(fetchedNews[0]);

      console.log(response);
    };
    fetchNews();
  }, [selectedCategory]);
  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };
  return (
    <div className="news-app">
      <div className="news-header">
        <h1 className="logo">News App</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">Categories</h1>
          <div className="categories">
            {categories.map((category) => {
              return (
                <a
                  href="#"
                  className="nav-link"
                  key={category}
                  onClick={(e) => {
                    handleCategoryClick(e, category);
                  }}
                >
                  {category}
                </a>
              );
            })}
          </div>
        </nav>
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => {
                handleArticleClick(headline);
              }}
            >
              <img src={headline.image || noimg} alt={headline.title} />
              <h2 className="headline-title">{headline.title}</h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => {
              return (
                <div
                  className="news-grid-item"
                  key={index}
                  onClick={() => {
                    handleArticleClick(article);
                  }}
                >
                  <img src={article.image || noimg} alt={article.title} />
                  <h3>{article.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <NewsModel
          show={showModel}
          article={selectedArticle}
          onclose={() => {
            setShowModel(false);
          }}
        />
      </div>
      <footer>
        <p className="copyright">
          <span>News App</span>
        </p>
        <p>&copy; All Rights Reserved.By Harsha Udhlani</p>
      </footer>
    </div>
  );
};

export default News;
