import RequestProps from "@types/RequestProps";
import { PessoaResumida } from "../../types/PessoaRessumida";
import styles from "@style/form.module.css";
import { useEffect, useState } from "react";
import Pessoa from "../../src/app/pessoa";
import { Endereco } from "@types/Endereco";
import Button from "@atom/Button";
export default function ModalPessoa({ pessoa, closeModal }: { pessoa?: PessoaResumida, closeModal: Function }) {

    const isUpdate = pessoa !== undefined;

    const [nome, setNome] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [enderecoPrincipal, setEnderecoPrincipal] = useState<Endereco | null>();
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);

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
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <span className={styles["close"]} onClick={() => closeModal()}>&times;</span>
                <h2>{isUpdate ? "Atualizar" : "Cadastrar"} Pessoa</h2>
                <form className={styles["form"]} onSubmit={savePessoa}>
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
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.logradouro} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.numero} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cidade} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.estado} /> </label>
                            <label className={styles["endereco-content-part"]}> <input type="text" value={endereco.cep} /> </label>
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