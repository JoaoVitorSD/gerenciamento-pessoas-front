"use client";
import { useEffect, useState } from "react";
import usePage from "../../hooks/UsePage";
import Pessoa from "../../src/app/pessoa";
import formatDate from "../../util/format/formatDate";
import styles from "@style/table.module.css";
import Pagination from "@molecule/Pagination";
import Button from "@atom/Button";
import { PessoaResumida } from "@types";
import {RequestProps} from "@types";
import ModalPessoa from "@molecule/ModalPessoa";
export default function PessoasTable() {
    const page = usePage<PessoaResumida>();
    const [filter, setFilter] = useState<string>("");
    function loadPessoas() {
        const props: RequestProps = {
            method: "GET",
            params: page.getPageParams(),

        };
        Pessoa(props).then((resp) => {
            page.setPage(resp)
        });
    }
    useEffect(function reloadData() {
        loadPessoas();
    }, [page.page, filter]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPessoa, setSelectedPessoa] = useState<PessoaResumida|undefined>(undefined);

    function openModal(pessoa: PessoaResumida){
        setSelectedPessoa(pessoa);
        setModalOpen(true);
    }
    function closeModal(){
        setModalOpen(false);
        setSelectedPessoa(undefined);
    }
    return (
        <div className={styles["table-container"]}>
            <div className={styles["input-container"]}>
                <input type="text"
                    className={styles["filter-input"]}
                    placeholder="Filtrar por nome, estado, cidade, cep..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} />
                <Button action={loadPessoas} name={"Recarregar"} type="button" />
            </div>
            <table className={styles["table"]}>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Endereço Principal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className={styles["table-body"]}>

                    {page&&Array.isArray(page?.content) && page.content.map(pessoa => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.id}</td>
                            <td>{pessoa.nome}</td>
                            <td>{formatDate(pessoa.dataNascimento)}</td>
                            <td>
                                {pessoa.enderecoPrincipal ? (
                                    `${pessoa.enderecoPrincipal.logradouro}, ${pessoa.enderecoPrincipal.numero}, ${pessoa.enderecoPrincipal.cidade}, ${pessoa.enderecoPrincipal.estado}, ${pessoa.enderecoPrincipal.cep}`
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td><Button action={() => openModal(pessoa)} name="Editar"  type="button" /></td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {modalOpen && <ModalPessoa pessoa={selectedPessoa} closeModal={closeModal} />}
            <Pagination {...page} />
        </div>

    )
}
