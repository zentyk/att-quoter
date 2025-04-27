export default function useAdvice(props: { noDiscount: boolean; }) {
    return (
        props.noDiscount ?
        <p id="advice" >PLAN WITHOUT DISCOUNT, USE THE DEFAULT LIST PRICE</p> :
        null
    );
}