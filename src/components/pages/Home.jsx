import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const Home = () => {
  const [databaseInfo, setDatabaseInfo] = useState([]);
  const [dataIds, setDataIds] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dbref = collection(db, "blogPost");
      try {
        const datas = onSnapshot(dbref ,(querySnapshot) => {
          const info = [];
          const ids = [];

          querySnapshot.forEach((doc) => {
            info.push(doc.data());
            ids.push(doc.id);
          });

          setDatabaseInfo(info);
          setDataIds(ids);
        });
        return () => datas();
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {databaseInfo.length === 1 ? (
        <div>
          <div>
            <Card
              title={databaseInfo[0].title}
              category={databaseInfo[0].category}
              content={databaseInfo[0].content}
              imageUrl={databaseInfo[0].thumbnail}
              postId={dataIds[0]}
              date={databaseInfo[0].date}
              username={databaseInfo[0].username}
              likes={databaseInfo[0].likes && databaseInfo[0].likes.length}
              comments={databaseInfo[0].comments && databaseInfo[0].comments.length}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {databaseInfo.map((data, index) => (
            <div key={dataIds[index]}>
              <Card
                title={data.title}
                category={data.category}
                content={data.content}
                imageUrl={data.thumbnail}
                postId={dataIds[index]}
                date={data.date}
                username={data.username}
                likes={data.likes && data.likes.length}
                comments={data.comments && data.comments.length}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
