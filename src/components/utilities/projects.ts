import jpmarx from '../../images/Jp-Marx.png'
import ecom from '../../images/ecommerce.png'

export const projects = [
    {
        id: '1',
        title: 'JP Marx Crayfish & Aquaculture',
        titleJp: 'JP Marx ザリガニ養殖',
        desc: 'Designed and developed a simple company website for product endorsements integrated with Facebook Messaging and Mail SMTP',
        descJp: 'FacebookメッセンジャーとメールSMTPを統合した、製品紹介用のシンプルな企業サイトを設計・開発しました。',
        image: jpmarx,
        tags: ['Laravel', 'Bootstrap', 'Facebook Messaging SDK'],
    },
    {
        id: '2',
        title: 'E-Commerce Template',
        titleJp: 'Eコマーステンプレート',
        desc: 'Full-stack E-commerce Website Template for businesses such as businesses selling PC components',
        descJp: 'PCパーツ販売などのビジネス向けに開発された、フルスタックのEコマースWebサイトテンプレートです。',
        image: ecom,
        tags: ['Java Spring', 'React Typescript', 'PostgreSQL'],
    },
];
