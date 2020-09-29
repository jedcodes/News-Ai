import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./Components/NewsCards/NewsCards";
import useStyles from "./styles";

const alanKey =
  "787c1ef63d76b3edc7fd11145ab8689d2e956eca572e1d8b807a3e2338fdd0dc/stage";

const alanLogoSrc = "https://alan.app/voice/images/previews/preview.jpg";

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevArticle) => prevArticle + 1);
        }
      },
    });
  }, []);

  return (
    <div className="app">
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} alt="" className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
