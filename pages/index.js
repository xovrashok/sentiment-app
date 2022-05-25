import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState("");

  /**
   *
   *
   * Fetch Analysis of the content
   */
  const fetchAnalysis = async () => {
    try {
      setAnalysis(`Analysing content...`);
      const res = await axios.post(`/api/analyse`, {
        content,
      });
      const { data } = res;

      const msg = `Your text sounds ${data.sentiment}. It has ${Math.floor(
        data.aggregate_sentiment.pos * 100
      )}% positivity, and ${Math.floor(
        data.aggregate_sentiment.neg * 100
      )}% negativity. It has a neutral level of ${Math.floor(
        data.aggregate_sentiment.neu * 100
      )}%.`;
      setAnalysis(msg);
    } catch (err) {
      setAnalysis(`Couldn't analyse the content.`);
      console.log(err);
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="heading">
          <div className="hamburger">
            <a href="#analysisText" style={{ marginLeft: "15%" }}>
              <p>Analysis text</p>
            </a>
          </div>
          <h3 className="text-heading">Sentiment Analysis</h3>
          <a href="#analysisText">
            <div className="arrow-down" />
          </a>
        </div>
      <div className="under-heading" id="analysisText">
        <div className="inputbox-text">
        <p>Please enter your text in english</p>
        </div>
        <textarea
          className="inputbox"
          placeholder="Write/paste any content..."
          onChange={(e) => setContent(e.target.value)}
        />
          <button
            className="button-analysis"
            onClick={fetchAnalysis}
          >
            Analyse
          </button>
        <textarea
          className="inputbox-analysis"
          placeholder="Analysis..."
          value={analysis}
          readOnly
        />
      </div>
    </div>
    </div>
  );
}
