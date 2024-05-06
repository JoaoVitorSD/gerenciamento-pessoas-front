"use client";
import { useEffect, useState } from "react";
import usePage from "../../hooks/UsePage";
import Pessoa from "../../src/app/pessoa";
import formatDate from "../../util/format/formatDate";
import styles from "@style/table.module.css";
import Pagination from "@molecule/Pagination";
import Button from "@atom/Button";
export default function PessoasTable() {
    const page = usePage<PessoaResumida>();
    const [filter, setFilter] = useState<string>("");
    function loadPessoas() {
        const params: any = page.getPageParams();
        page.clean()
        params["filter"] = filter;
        Pessoa(params).then((data) => {
            console.log(data);
            page.setPage({
                ...data
            });
        }
        );
    }
    useEffect(function reloadData() {
        loadPessoas();
    }, [page.page, filter]);

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
                    </tr>
                </thead>
                <tbody className={styles["table-body"]}>

                    {Array.isArray(page.content) && page.content.map(pessoa => (
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
                        </tr>
                    ))}
                </tbody>

            </table>
            <Pagination {...page} />
        </div>

    )
}
interface PessoaResumida {
    id: string;
    nome: string;
    dataNascimento: string;
    enderecoPrincipal?: EnderecoPrincipal;
}

interface EnderecoPrincipal {
    id: string;
    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    enderecoPrincipal: boolean;
}

