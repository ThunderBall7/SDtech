import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const Home = () => {
  const [databaseInfo, setDatabaseInfo] = useState([]);
  const [dataIds, setDataIds] = useState([]);

  console.log(databaseInfo)

  useEffect(() => {
    const getData = async () => {
      const dbref = collection(db, "blogPost")
      try {
        const data = onSnapshot(dbref ,(querySnapshot) => {
          const info = [];
          const ids = [];

          querySnapshot.forEach((doc) => {
            info.push(doc.data());
            ids.push(doc.id);
          });

          setDatabaseInfo(info);
          setDataIds(ids);
        });
        return data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);

  console.log(databaseInfo),
  console.log(dataIds)
  return (
    <div className="">
      {databaseInfo.map((data, index) => (
        <div key={dataIds[index]} className="w-full ">

          <Card title={data.title} category={data.category} content={data.content} imageUrl={data.thumbnail}
          postId={dataIds[index]}
          date={data.date}
          username={data.username}
          likes={data.likes && data.likes.length }
          comments={data.comments && data.comments.length}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
