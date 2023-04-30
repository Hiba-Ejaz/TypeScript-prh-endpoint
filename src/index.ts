import axios, { AxiosError } from "axios"
interface Company {
  businessId: string;
  name: string;
  registrationDate: string;
  companyForm: string;
  detailsUri: string;
}
interface CompanyList {
  type: string;
  version: string;
  totalResults: number;
  resultsFrom: number;
  previousResultsUri: string;
  nextResultsUri: string;
  exceptionNoticeUri: string | null;
  results:Company[];
}
interface uriDetail{
  results: DetailedResults[];
}
interface DetailedResults
{
    businessId: string, 
    name:string,      
    registrationDate: string,
    companyForm: string,
    detailsUri: null,
    liquidations: [],
    names: [],
   auxiliaryNames: [],       
    addresses: [],
    companyForms: [],
    businessLines: [],        
    languages: [],
    registedOffices: [],      
    contactDetails: [],
    registeredEntries: [],
    businessIdChanges: []
  }
const storedUri=[""];
const getData = async <T extends CompanyList >(maxResults:string,resultsFrom:string,streetAddressPostCode:string) => {
try {
       const result= await axios.get<T>(`https://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=${maxResults}&resultsFrom=${resultsFrom}&streetAddressPostCode=${streetAddressPostCode}`)  
    for(let i=0;i<Number(maxResults);i++){
       storedUri.push(result.data.results[i].detailsUri);
    }
    const  getDetailedData = async () => {
      fetchDetailedData<uriDetail>(maxResults);
  }
  getDetailedData();
  } catch (e) {
        const error = e as AxiosError
        console.log("not working")
    }
}
  const fetchDetailedData=async<T extends uriDetail>(maxResults:string)=>{
  try{
   for(let i=1;i<Number(maxResults);i++){
    const detailedResult=await axios.get<T>(storedUri[i]);
   detailedResult.data.results.forEach((company) => {
    console.log(company);
  })
}
  }
  catch (e) {
    const error = e as AxiosError
    console.log("nooooot working")
}
}
​const getProduct = async () => {
   await getData<CompanyList>("2","0","00520");
}
getProduct();