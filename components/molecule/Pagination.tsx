"use client";
import Button from "@atom/Button";
import { PageProps } from "../../hooks/UsePage";
import styles from "@style/table.module.css";
export default function Pagination<T>({ page, size,
    numberOfElements,
    totalElements,
    totalPages,
    content,
    moveLeft,
    moveRight,
    getPageParams,

}: PageProps<T>) {

    // x elements of y
    return (
        <>
            {content.length > 0 &&

                <div className={styles.pagination}>
                    <Button action={moveLeft} name={"<"} type="button" />
                    <span>{page + 1} de {totalPages}</span>
                    <Button action={moveRight} name={">"} type="button" />
                    <span>{size * page + numberOfElements} - {totalElements} </span>
                </div>
            }
        </>

    )
}