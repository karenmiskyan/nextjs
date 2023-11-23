import { CustomerSvg, PaymentSvg, ReturnSvg, StoreSvg } from "./SVG";

export const CustomerService = [
    {
        id: 1,
        svg: <CustomerSvg />,
        title: 'FREE SHIPPING',
        subtitle: 'Free Standard Ground UPS Shipping on Orders over $1K'
    },
    {
        id: 2,
        svg: <StoreSvg />,
        title: 'FREE DELIVERY',
        subtitle: 'Free Delivery within 25 Miles of North Hollywood for Purchases Over $2K'
    },
    {
        id: 3,
        svg: <PaymentSvg />,
        title: 'FREE PICKUP',
        subtitle: 'Free 24/7 Self-Pick Up Service Available at KOA Las Vegas Location'
    },
    {
        id: 4,
        svg: <ReturnSvg />,
        title: 'DVR PASSWORD RESET',
        subtitle: '(818) 255-6161'
    },
]