import React, { useState, useRef,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Papa from 'papaparse';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { EmailComposer } from 'capacitor-email-composer'
import { Firestore, collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "./db";
import { IonButton, IonItem, IonInput } from '@ionic/react';
import handleSubmit from './addData';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


interface ContainerProps { };

const Invoice2: React.FC<ContainerProps> = (props) => {

  const [rowData, setRowData] = useState([
    { Description: '', price: 0 }
  ])

  const [columnDefs] = useState([
      { field: 'Description', editable: true },
      { field: 'price', editable: true },
  ]);

  const agGridRef = useRef(null);

  const addNewRow = () => {
    console.log('first');
    const newRow = { Description: '', price: 0 };
    setRowData([...rowData, newRow]);
  }

  const handleCellValueChanged = (params: any) => {
    const updatedRowData = rowData.map((row, index) => {
      if (index === params.node.rowIndex) {
        return {
          ...row,
          [params.colDef.field]: params.newValue,
        };
      }
      return row;
    });
    setRowData(updatedRowData);
  };

  const saveData = () => {
    
    const dataToSave = {
      name: fileName,
      from: {
        name: fromName,
        adress: fromAdress,
      },
      to: {
        name: toName,
        adress: toAdress
      },
      rowData: rowData
    }

    console.log(dataToSave);

    // from here save to firebase
    handleSubmit(dataToSave);

  }

  const [fromName, setFromName] = useState('');
  const [fromAdress, setFromAdress] = useState('');
  const [toName, setToName] = useState('');
  const [toAdress, setToAdress] = useState('');
  const [fileName, setFileName] = useState('');

  const downloadFile = () => {

    const data = rowData;

    console.log(data);

    const csv = Papa.unparse(data);
    console.log(csv);
    const blob = new Blob([csv], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  

  }

  const emailFile = async () => {

    const filepath = 'data.csv'

    const csv = Papa.unparse(rowData);
    console.log(csv);

    await Filesystem.writeFile({
      path: filepath,
      data: csv,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    await EmailComposer.open(({
      body: 'Sending CSV file'
    }))

  }

  const [total, setTotal] = useState();

  useEffect(() => {

    const data = rowData;
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      sum += element.price;
    }

    // @ts-ignore
    setTotal(sum);

  }, [rowData])


  // @ts-ignore
  if (props.saved) {
    const [loading, setLoading] = useState(true);
    const [matchingData, setMatchingData] = useState([]);

    const fetchData = async () => {
      try {
        const dataCollection = collection(firestore, "test_data");
        // @ts-ignore
        const q = query(dataCollection, where('testData.name', "==", props.name));
        const querySnapshot = await getDocs(q);

        // @ts-ignore
        const matchingDataArray = [];
        querySnapshot.forEach((doc) => {
          matchingDataArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        if (matchingDataArray.length > 0) {
          // @ts-ignore
          setMatchingData(matchingDataArray[0].testData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []); // Empty dependency array to run the effect once when the component mounts

    if (loading) return <>Loading...</>;

    console.log(matchingData);

    return (
      <>

      <IonItem>
      <IonButton onClick={saveData} >Save File.</IonButton> <br />
      <IonButton href='/files' >List Files</IonButton> <br />
      </IonItem>

      <IonItem>
        <IonInput label='File Name' 
        // @ts-ignore
        placeholder={matchingData.name}
          //@ts-ignore
          onIonChange={e => setFileName(e.detail.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput label="From: "
        // @ts-ignore
        onIonChange={e => setFromName(e.detail.value)}  placeholder={matchingData.from.name} ></IonInput>
        <IonInput label="From Adress: " 
        // @ts-ignore
        onIonChange={e => setFromAdress(e.detail.value)} placeholder={matchingData.from.adress}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput label="Bill To: " 
          // @ts-ignore
          onIonChange={e => setToName(e.detail.value)} placeholder={matchingData.to.name}
        ></IonInput>
        <IonInput label="Bill Adress: "
          // @ts-ignore
          onIonChange={e => setToAdress(e.detail.value)} placeholder={matchingData.to.adress}
        ></IonInput>
      </IonItem>

      <button onClick={addNewRow} style={{fontSize: '22px'}} >Add</button>
    
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          // @ts-ignore
          rowData={matchingData.rowData}
          ref={agGridRef}
          // @ts-ignore
          columnDefs={columnDefs}
          onCellValueChanged={handleCellValueChanged}
          >
        </AgGridReact>
      </div>
    </>
    )

  }

  return (
    <>

      <IonItem>
      <IonButton onClick={saveData} >Save File</IonButton> <br />
      <IonButton onClick={downloadFile} >Download File</IonButton> <br />
      <IonButton onClick={emailFile} >Email File</IonButton> <br />
      <IonButton href='/files' >List Files</IonButton> <br />
      </IonItem>

      <IonItem>
        <IonInput label='File Name' placeholder='Enter File Name'
          //@ts-ignore
          onIonChange={e => setFileName(e.detail.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput label="From: " placeholder="Enter Name" 
        // @ts-ignore
        onIonChange={e => setFromName(e.detail.value)} ></IonInput>
        <IonInput label="From Adress: " placeholder="Enter Adress"
        // @ts-ignore
        onIonChange={e => setFromAdress(e.detail.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput label="Bill To: " placeholder="Enter Name"
          // @ts-ignore
          onIonChange={e => setToName(e.detail.value)}
        ></IonInput>
        <IonInput label="Bill Adress: " placeholder="Enter Adress"
          // @ts-ignore
          onIonChange={e => setToAdress(e.detail.value)}
        ></IonInput>
      </IonItem>

      <button onClick={addNewRow} style={{fontSize: '22px'}} >Add</button>
    
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          ref={agGridRef}
          // @ts-ignore
          columnDefs={columnDefs}
          onCellValueChanged={handleCellValueChanged}
          >
        </AgGridReact>

        <h3 style={{background: 'black', color: 'white'}} >Total: {total} </h3>

      </div>
    </>
  );
  
}

export default Invoice2;