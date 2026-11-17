import React from 'react';
import Image from 'next/image';
import { Arrow } from '@/shared/ui';
export function TableInvitation() { return <section className="closing section" aria-labelledby="closing-title"><div className="container closing-inner"><p className="eyebrow">Дивновкусье · русская сказка на вашем столе</p><h2 id="closing-title">Всех<br /><em>к столу.</em></h2><a className="btn btn--primary btn--xl" href="#products">Выбрать вареники <Arrow /></a><Image className="closing-flower brand-bird" src="/brand/bird-green.webp" alt="" aria-hidden="true" width={640} height={1210} /></div></section>; }
