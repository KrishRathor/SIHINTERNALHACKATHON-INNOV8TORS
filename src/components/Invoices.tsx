import React from 'react';


import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import SpredSheets from './SpredSheets';

interface ContainerProps { };

const Invoices: React.FC<ContainerProps> = () => {

    const [selectedOption, setSelectedOption] = React.useState('invoice2');

    const checkSelectedOption = (event: any)  => {
        console.log(event.detail.value);
        setSelectedOption(event.detail.value)
    }

    return (
        <>
            <IonList style={{marginTop: '1vh'}} >
                <IonItem>
                    <IonSelect aria-label="Invoice" value={selectedOption} onIonChange={checkSelectedOption} >
                        <IonSelectOption value="invoice1">Invoice 1</IonSelectOption>
                        <IonSelectOption value="invoice2">Invoice 2</IonSelectOption>
                        <IonSelectOption value="companyinvoice1">Company Invoice 1</IonSelectOption>
                        <IonSelectOption value="companyinvoice2">Company Invoice 2</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonList>
            <SpredSheets option={selectedOption} />
        </>
    )
}

export default Invoices;