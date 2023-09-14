import CompanyInvoice1 from "./CompanyInvoice1";
import Invoice2 from "./Invoice2";
import Invoice1 from "./Invoice1";
import CompanyInvoice2 from "./CompanyInvoice2";

interface ContainerProps {
    option: string,
};

const SpredSheets: React.FC<ContainerProps> = ({option}) => {
    return (
        <>
            { option === 'invoice1' ? <Invoice1 /> : <></> }
            { option === 'invoice2' ? <Invoice2
                // @ts-ignore
            saved={false} rowData={null} /> : <></> }
            { option === 'companyinvoice1' ? <CompanyInvoice1 /> : <></> }
            { option === 'companyinvoice2' ? <CompanyInvoice2 /> : <></> }
        </>
    )
}

export default SpredSheets;