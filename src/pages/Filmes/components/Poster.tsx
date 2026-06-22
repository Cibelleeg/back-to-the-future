import { useState } from 'react';
import * as S from '../FilmesPage.styles';
import { FILM_SVG } from './icons';

interface PosterProps {
  src: string;
  alt: string;
  size: 'hero' | 'modal';
}

export function Poster({ src, alt, size }: PosterProps) {
  const [imgOk, setImgOk] = useState(true);
  const Wrap = size === 'hero' ? S.HeroPoster : S.ModalPosterWrap;

  return (
    <Wrap>
      {imgOk && <S.HeroImg src={src} alt={alt} onError={() => setImgOk(false)} />}
      <S.PosterFallback>{FILM_SVG}</S.PosterFallback>
    </Wrap>
  );
}
