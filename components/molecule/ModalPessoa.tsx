import {PessoaResumida, RequestProps, Endereco as EnderecoType} from "@types";
import styles from "@style/form.module.css";
import { useEffect, useState } from "react";
import Pessoa from "../../src/app/pessoa";
import Button from "@atom/Button";
import Endereco from "../../src/app/endereco";
import CloseModalButton from "@atom/CloseModalButton";
export default function ModalPessoa({ pessoa, closeModal }: { pessoa?: PessoaResumida, closeModal: Function }) {

    const isUpdate = pessoa !== undefined;

    const [nome, setNome] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [enderecoPrincipal, setEnderecoPrincipal] = useState<EnderecoType | null>();
    const [enderecos, setEnderecos] = useState<EnderecoType[]>([]);

    
    useEffect( function loadPessoa() {
        if(isUpdate){
            findPessoaById();
            return;
        }
        addEndereco();
    }, []);

    async function findPessoaById(){
        const path = pessoa?.id;
        const request = await Pessoa({ method: "GET", path });
        if (request.ok) {
            const { data } = request;
            setNome(data.nome);
            setDataNascimento(data.dataNascimento);
            setEnderecoPrincipal(data.enderecoPrincipal?.id);
            setEnderecos(data.enderecos);
        }
    }

    function changeEndereco(enderecoUpdateIndex: number, key: string, value: any) {
        const enderecoUpdated: any = enderecos[enderecoUpdateIndex];
        enderecoUpdated[key] = value;
        console.table(enderecoUpdated);
        setEnderecos(prevEnderecos => prevEnderecos.map((endereco,index)=>index === enderecoUpdateIndex ?enderecoUpdated : endereco))
    }
    function addEndereco() {
        setEnderecos([...enderecos, {cep: "", cidade: "", estado: "", logradouro: "", numero: "", enderecoPrincipal: false}])
    }
    async function savePessoa() {

        const request: RequestProps = {
            method: isUpdate ? "PUT" : "POST",
            body: {
                id: pessoa?.id,
                nome,
                dataNascimento,
                enderecos,
            },
        }
        const response =await Pessoa(request);
        if (response.ok) {
            closeModal();
            return;
        }
    }
    function salvarEndereco(endereco: EnderecoType) {
        const request: RequestProps = {
            method: "PUT",
            body: {...endereco, pessoa: pessoa?.id}
        }
        Endereco(request).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            return Promise.reject(resp);
        }).then(data => {
            const errorMessage = data?.message;
            alert(errorMessage || "Erro ao salvar endereço");
        })
    }
    function toggleEnderecoPrincipal(enderecoIndex: number) {
        enderecos.forEach((endereco) => endereco.enderecoPrincipal = false);
        const endereco = enderecos[enderecoIndex];
        endereco.enderecoPrincipal = !endereco.enderecoPrincipal;
        setEnderecos([...enderecos]);
    }
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <form className={styles["form"]} onSubmit={savePessoa}>
                <div className={styles["modal-header"]}> 
                <h2>{isUpdate ? "Atualizar" : "Cadastrar"} Pessoa</h2>
                <CloseModalButton action={closeModal} />
                </div>
                    <div className={styles["modal-content-input"]}>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        <label>Data de Nascimento</label>
                        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
                    </div>

                    <div className={styles["endereco-content"]}>

                        <label className={styles["endereco-content-part"]}>Principal</label>
                        <label className={styles["endereco-content-part"]}>Logradouro</label>
                        <label className={styles["endereco-content-part"]}>Número</label>
                        <label className={styles["endereco-content-part"]}>Cidade</label>
                        <label className={styles["endereco-content-part"]}>Estado</label>
                        <label className={styles["endereco-content-part"]}>CEP</label>
                    </div>
                    {Array.isArray(enderecos) && enderecos.map((endereco, index) => {
                        return <div key={index} className={styles["endereco-content"]}>
                            <label className={styles["endereco-content-part"]}><input type="radio"  checked={endereco.enderecoPrincipal} onClick={() => toggleEnderecoPrincipal(index)}  /></label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.logradouro} onChange={(event) => changeEndereco(index, "logradouro", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.numero} onChange={(event) => changeEndereco(index, "numero", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cidade} onChange={(event) => changeEndereco(index, "cidade", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.estado} onChange={(event) => changeEndereco(index, "estado", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cep} onChange={(event)=> changeEndereco(index, "cep", event.target.value)} /> </label>
                            {endereco.id?<Button action={() => salvarEndereco(endereco)} name={"Salvar"} type="button" />: null}
                        </div>

                    })}
                    <div className={styles["modal-center-button"]}>
                    <Button action={()=>addEndereco()} name={"Novo +"} type="button" />
                    </div>
                    <div className={styles["modal-content-button"]}>

                        <Button action={savePessoa} name={isUpdate ? "Atualizar" : "Cadastrar"} type="button" />
                    </div>
                </form>
            </div>
        </div>
    )

}