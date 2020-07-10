import NP from 'number-precision'
export function moneyRound(v,n){
	if(n){
		return NP.round(v/100,n)
	}
	return NP.round(v/100,2)
}