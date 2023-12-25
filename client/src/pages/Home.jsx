import React, { useState, useEffect } from 'react'

import { Card, Loader, FormField } from "../components"

const RenderCards = ({ data, title }) => {
   if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />)
   }
   return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
   )
}

function Home() {
   const [loading, setLoading] = useState(false)
   const [allPosts, setAllPosts] = useState(null)
   const [searchText, setsearchText] = useState('')
   const [searchedResults, setSearchedResults] = useState(null)
   const [searchTimout, setSearchTimout] = useState(null)
   useEffect(() => {
      const fetchPosts = async () => {
         setLoading(true)

         try {
            const response = await fetch("http://localhost:8080/api/v1/post", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json"
               }
            })
            if (response.ok) {
               const result = await response.json()

               setAllPosts(result.data.reverse())
            }
         } catch (error) {
            alert(error)
         } finally {
            setLoading(false)
         }
      }
      fetchPosts()
   }, [])

   const handleSearchChange = (e) => {
      clearTimeout(searchTimout)
      setsearchText(e.target.value)

      setSearchTimout(setTimeout(() => {
         const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))

         setSearchedResults(searchResults)
      }, 300))
   }

   return (
      <section className='max-w-7xl mx-auto'>
         <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
               Все посты
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Можете просмотреть все картины созданные искусственным интелектом от OpenAI</p>
         </div>

         <div className="mt-16">
            <FormField labelName="Поиск постов" type='text' name="text" placeholder="Поиск" value={searchText} handleChange={handleSearchChange} />
         </div>

         <div className="mt-10">
            {
               loading ? (
                  <div className="flex justify-center items-center">
                     <Loader />
                  </div>
               ) : (<>
                  {
                     searchText && (
                        <h2 className="font-medium text-[#666e75] text-xl mb-3"> Результаты запроса
                           <span className='text-[#222328]'>{searchText}</span>
                        </h2>

                     )
                  }
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-2 gap-3">
                     {searchText ? (
                        <RenderCards
                           data={searchedResults}
                           title='не найдено'
                        />
                     ) : (
                        <RenderCards
                           data={allPosts}
                           title='Нету постов'
                        />
                     )}
                  </div>
               </>

               )}
         </div>
      </section>
   )
}

export default Home