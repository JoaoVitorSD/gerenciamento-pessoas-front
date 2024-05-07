export default interface RequestProps{
    method: string;
    params?: Record<string,string>;
    body?: Object; 
    path?: string;   
}