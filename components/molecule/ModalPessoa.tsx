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

    useEffect(function loadPessoa() {
        const path = pessoa?.id ? pessoa.id : "";
        Pessoa({ method: "GET", path }).then(data => {
            setNome(data.nome);
            console.log(path)
            setDataNascimento(data.dataNascimento);
            setEnderecoPrincipal(data.enderecoPrincipal?.id);
            setEnderecos(data.enderecos);
        })
    }, [pessoa])

    function changeEndereco(enderecoUpdate: any, key: string, value: string) {
        enderecoUpdate[key] = value;
        setEnderecos(prevEnderecos => prevEnderecos.map(endereco=> endereco.id === enderecoUpdate.id ? enderecoUpdate : endereco))
    }
    function savePessoa() {

        const request: RequestProps = {
            method: isUpdate ? "PUT" : "POST",
            body: {
                nome,
                dataNascimento,
                enderecoPrincipal
            },
        }
        Pessoa(request).then(resp => {
            if (resp.ok) {
                closeModal();
                Promise.reject(resp)
            }
            return resp.json()

        }).then(data => {
            const errroMessage = data?.message;
            alert(errroMessage || "Erro ao salvar pessoa");
        });
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
                            <label className={styles["endereco-content-part"]}><input type="radio" value={endereco.id} checked={enderecoPrincipal?.id === endereco.id} onChange={(e) => setEnderecoPrincipal(endereco)} required /></label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.logradouro} onChange={(event) => changeEndereco(endereco, "logradouro", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.numero} onChange={(event) => changeEndereco(endereco, "numero", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cidade} onChange={(event) => changeEndereco(endereco, "cidade", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.estado} onChange={(event) => changeEndereco(endereco, "estado", event.target.value)} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cep} onChange={(event)=> changeEndereco(endereco, "cep", event.target.value)} /> </label>
                            <Button action={() => salvarEndereco(endereco)} name={"Salvar"} type="button" />
                        </div>

                    })}
                    <div className={styles["modal-content-button"]}>

                        <Button action={savePessoa} name={isUpdate ? "Atualizar" : "Cadastrar"} type="button" />
                    </div>
                </form>
            </div>
        </div>
    )

}