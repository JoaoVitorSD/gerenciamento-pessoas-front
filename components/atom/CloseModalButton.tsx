import styles from "@style/page.module.css"
export default function CloseModalButton({ action }: {
    action:Function,
}
) {
    return <button className={`${styles["button-close"]}`} onClick={()=>action()} type="button">X</button>   
}