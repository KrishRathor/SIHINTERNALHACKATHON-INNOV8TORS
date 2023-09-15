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

const Invoice1: React.FC<ContainerProps> = () => {

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

  const [rowData, setRowData] = useState([
    { Description: '', price: 0 }
  ])

  const [columnDefs] = useState([
      { field: 'Description', editable: true },
      { field: 'Hours', editable: true },
      { field: 'price', editable: true },
      { field: 'amount', editable: true },
  ]);

  const agGridRef = useRef(null);

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

  const [fromName, setFromName] = useState('');
  const [fromAdress, setFromAdress] = useState('');
  const [toName, setToName] = useState('');
  const [toAdress, setToAdress] = useState('');
  const [fileName, setFileName] = useState('');

  return (
    
    <>
      <IonItem>
      <IonButton onClick={saveData} >Save File new ++</IonButton> <br />
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


      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
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

export default Invoice1;