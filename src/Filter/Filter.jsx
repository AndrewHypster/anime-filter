import { useEffect, useState } from 'react'
import animeAPI from './anime.json'
import './filter.css'

const Filter = res => {
  const anime = animeAPI.data
  const [sort, setSort] = useState([])
  const [genres, setGenre] = useState([])
  const [years, setYears] = useState([])

  // юзер змінив тип сортування
  const changeSort = select => {
    switch (select.target.value) {
      case 'name': {
        const titles = [], names = [], indexes = []
        anime.forEach(anime => titles.push(anime.title))
        anime.forEach(anime => names.push(anime.title))
        names.sort().forEach(name => indexes.push(titles.indexOf(name)))
        setSort(indexes)
      }
    }
  }

  // юзер змінив жанр
  const changeGenre = select => {
    const genres = []
    const indexes = []
    anime.forEach(e => genres.push(e.genres)) // записує масив жанрів кожного аніме в масив genres
    genres.forEach((e, i) => e.forEach(e => e.name === select.target.value? indexes.push(i) : console.log()))
    setGenre(indexes)
  }

  // юзер змінив рік
  const changeYear = select => {
    const year = []
    anime.forEach((anime, i) => anime.year === +select.target.value? year.push(i) : console.log())
    setYears(year)
  }

  useEffect (() => {
    const arr = [...sort, ...years, ...genres]
    const res = {};
    const resul = []
    arr.forEach(a => res[a] = res[a] + 1 || 1)
    for(let e in res) res[e]===((sort.length>0)+(years.length>0)+(genres.length>0))? resul.push(e) : console.log();
    console.log(resul);
  })

  // автоматично створює жанри і роки, дивлячись на всі аніме
  const create = that => {
    switch (that) {
      case `years`: {
        anime.sort((b, a) => a.year-b.year) // сортує [1, 80, 0, 2, 45] => [0, 1, 2, 45, 80]
        const years = []
        anime.forEach(e => e.year? years.push(e.year) : console.log()) // якщо є null то незаписує в масив years
        return [...new Set(years)] // видаляє значення які повторяються та вертає масив
      }
      case `genres`: {
        const genres = []
        anime.forEach(e => e.genres.forEach(genre => genres.push(genre.name))) // записує жанри кожного аніме в масив genres
        return [...new Set(genres)].sort() // вертає посортований масив без повторних значень
      }
    }
  }

  return (
    <div className="Filter">
      <select onChange={select => changeSort(select)}>
        <option className='hiden' value={null}>&nbsp;&nbsp;&nbsp;&nbsp;Сортувати за</option>
        <option value="name">&nbsp;&nbsp;&nbsp;&nbsp;За новизною</option>
      </select>

      <select onChange={select => changeGenre(select)}>
        <option className='hiden' value={null}>&nbsp;&nbsp;&nbsp;&nbsp;Жанр</option>
        {create('genres').map((genre, i) => <option value={genre} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{genre}</option>)} {/* циклом записує всі жанри, key щоб React не сварився */}
      </select>

      <select onChange={select => changeYear(select)}>
        <option className='hiden' value={null}>&nbsp;&nbsp;&nbsp;&nbsp;Рік</option>
        {create('years').map((year, i) => <option value={year} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{year}</option>)} {/* циклом записує всі роки, key щоб React не сварився */}
      </select>
    </div>
  )
}

export default Filter