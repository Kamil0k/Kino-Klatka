import './OurCinemas.css'
import SectionTitle from '../UI/SectionTitle'
import CinemaItem from './CinemaItem'

import cinema1 from '../../assets/img/cinema1-small.jpg'
import cinema2 from '../../assets/img/cinema2-small.jpg'
import cinema3 from '../../assets/img/cinema3-small.jpg'
import cinema4 from '../../assets/img/cinema4-small.jpg'

const OurCinemas = () => {
	return (
		<>
			<div className='cinema'>
				<div className='wrapper'>
					<SectionTitle className='cinema__title' title='nasze kina' />
					<div className='cinema__items'>
						<CinemaItem
							src={cinema4}
							alt='Sala kinowa z mnóstwem ludzi'
							title='Przestronne sale'
							description='Nasze kina posiadają wiele sal, które mogą pomieścić tysiące widzów! Po każdym seansie każda z sal jest starannie czyszczona przez naszych pracowników. W każdej z sal znajduje się wiele pojedyńczych miejsc, aczkolwiek niektóre z nich zawierają miejsca podwójne - z myślą o zakochanych.'
                            right={false}
						/>
						<CinemaItem
							src={cinema3}
							alt='Para oglądająca film w kinie, w ręcac trzmają colę oraz popcorn'
							title='Seanse dla wszystkich'
							description='W naszych kinach posiadamy bardzo bogaty repertuar, który trafa w gusta kinomaniaków w różnym wieku. Organizowane są u nas specjalne seanse filmowe, dostosowane do potrzeb i wymagań poszczególnych grup, np. z napisami dla osób niesłyszących, audiodeskrypcją dla osób niewidzących, wyborem filmów zgodnych z wiekiem dzieci itp.'
                            right={true}
						/>
						<CinemaItem
							src={cinema2}
							alt='Wiele pudełek z popcornem'
							title='Pyszne przekąski'
							description='Nasze kino słynie z bogatej oferty przekąsek i napojów. Klienci mogą cieszyć się tradycyjnymi popcornem, nachosami, hot-dogami, a także zdrowszymi opcjami, takimi jak świeże owoce czy koktajle owocowe. Kino Klatka stawia na jakość i wygodę, zapewniając klientom możliwość zamawiania przekąsek bezpośrednio z miejsca w sali kinowej, bez konieczności wychodzenia na zewnątrz. '
                            right={false}
						/>
						<CinemaItem
							src={cinema1}
							alt='Kino w amerykańskim stylu'
							title='Zachodni styl'
							description='Kino Klatka słynie z charakterystycznego, amerykańskiego wystroju wnętrz. Kino odznacza się stylowymi meblami, neonowymi reklamami, a także oryginalnymi plakatami filmowymi, które stanowią element dekoracyjny sal kinowych. W "Amerykańskim wystroju" klienci mogą poczuć się jakby przenieśli się do kina w Stanach Zjednoczonych i cieszyć się filmami z różnych gatunków.'
                            right={true}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default OurCinemas
