const AdminDashboard = () => {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Panel 👑</h1>
        <p>Добро пожаловать, Админ! Здесь будет твоя админка.</p>
  
        <button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await fetch("http://localhost:8000/admin/parse_films", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            });
            const data = await res.json();
            alert(data.message);
          }}
        >
          🚀 Запустить парсинг фильмов
        </button>
      </div>
    );
  };
  
  export default AdminDashboard;
  