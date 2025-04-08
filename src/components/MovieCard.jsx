import { motion } from "framer-motion";
import "./../styles/MovieCard.css";

function MovieCard({ title, poster }) {
  return (
    <div className="centered-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(255, 255, 255, 0.2)" }}
        className="movie-card"
      >
        <img src={poster} alt={title} className="movie-poster" />
        <div className="movie-info">
          <h3>{title}</h3>
        </div>
      </motion.div>
    </div>
  );
}

export default MovieCard;
