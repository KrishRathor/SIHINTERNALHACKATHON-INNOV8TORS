import './ExploreContainer.css';

import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonHeader>
          <IonTitle style={{marginTop: '8px'}}>Editing: Filename</IonTitle>
      </IonHeader>
    </>
  );
};

export default ExploreContainer;
