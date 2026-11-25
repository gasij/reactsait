import Image from 'next/image';
import s from './philosophy.module.css';

const principles = [
  ['apples', 'Натуральный состав и тщательный подбор сырья. Мы не используем готовые смеси.'],
  ['fillings', 'Каждая начинка готовится нами из натуральных ягод, фруктов, творога, сыра и отборного мяса.'],
  ['recipes', 'Авторские рецептуры, рождённые из домашних традиций и воплощённые в наших дивных блюдах.'],
];

export function Philosophy() {
  return (
    <section id="presentation" className={s.panel} aria-labelledby="philosophy-title">
      <h2 id="philosophy-title">Наша философия проста,<br />но бескомпромиссна</h2>
      <ul>{principles.map(([photo, text]) => (
        <li key={photo}><Image src={'/brand/editorial/' + photo + '.webp'} alt="" width={240} height={226} sizes="(max-width: 640px) 150px, 16vw" /><p>{text}</p></li>
      ))}</ul>
      <p className={s.promise}>Мы создаём не просто готовые продукты, а доверие. Доверие к тому, что на вашей тарелке — настоящее, вкусное и сделанное с душой.</p>
    </section>
  );
}
