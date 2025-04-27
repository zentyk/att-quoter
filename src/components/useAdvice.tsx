export default function useAdvice(props: { noDiscount: boolean; }) {
    return (
        props.noDiscount ?
        <p id="advice" style={{ color: "red" }} >Los equipos en este plan no tienen descuento, usa el precio de lista</p> :
        null
    );
}