import styles from "@style/page.module.css"
export default function Button({name, action, type}:{
    name: string,
    action: () => void,
    type: "button" | "submit" | "reset"

}
){
    return (
        <button className={styles["button"]} onClick={action} type={type}>{name}</button>
    )
}