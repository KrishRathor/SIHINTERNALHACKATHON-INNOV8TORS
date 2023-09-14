import React, { useEffect, useState } from 'react';
import { Firestore, collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "./db";
import { IonButton } from '@ionic/react';
import Invoice2 from './Invoice2';

interface ContainerProps { }

const FilesComp: React.FC<ContainerProps> = () => {

  const [data, setData] = useState([]); 
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(firestore, "test_data");
      const querySnapshot = await getDocs(dataCollection);

      // @ts-ignore
      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedData.push({
          id: doc.id, // Document ID
          name: data.testData.name, // Extract the "name" attribute
          // ...other attributes
        });
      });

      //@ts-ignore
      setData(fetchedData);

      // Extract an array of names from the fetched data
      // @ts-ignore
      const namesArray = fetchedData.map((item) => item.name);
      // @ts-ignore
      console.log(namesArray);
      // @ts-ignore
      setNames(namesArray);
    };

    fetchData();
  }, []);

  const [showFiles, setShowFiles] = useState(true);
  const [matchingData, setMatchingData] = useState([]); 

  const goToSpecificFile = (item: string, key: number) => {
    console.log(item, key);
    // @ts-ignore
    setName(item);

    const dataCollection = collection(firestore, "test_data");
    const q = query(dataCollection, where('testData.name', "==", item));

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);

        // @ts-ignore
        const matchingDataArray = [];
        querySnapshot.forEach((doc) => {
          matchingDataArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // @ts-ignore
        setMatchingData(matchingDataArray[0].testData);
        // @ts-ignore
        // console.log(matchingDataArray[0].testData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    setShowFiles(false);
  }

  const [name, setName] = useState();

  if (!showFiles) return <Invoice2
  // @ts-ignore
  saved={true} rowData={matchingData} name={name} />

  return (
    <>

      <IonButton href='/home' >Go Back</IonButton> <br />

      { names.map((item: string, key) => (
        <>
          <button key={key} style={{fontSize: '20px', margin: '5px', background: 'black' }} onClick={() => goToSpecificFile(item, key)} >{item}</button> <br></br>
        </>
      ))}
    </>
  )
}

export default FilesComp;