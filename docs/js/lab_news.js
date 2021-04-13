const labNews = document.getElementById('labNews')

const resources = [{
    imgPath: 'n2020graduate.jpg',
    title: '2020年度学部4回生(2期生))が卒業しました！',
    href: '',
    time: '2021年3月22日',
}, {
    imgPath: '',
    title: '社会知能研究室に新メンバーが加わりました。',
    href: '',
    time: '2020年10月1日',
}, {
    imgPath: 'n2019graduate.jpeg',
    title: '2019年度学部4回生(1期生))が卒業しました！',
    href: '',
    time: '2020年3月19日',
}, {
    imgPath: 'n2020Torii.jpg',
    title: '2020年1月20日にみらい翻訳の鳥居大祐氏が講演を行いました。',
    href: 'talkTorii-ja.html',
    time: '2020年1月20日',
}, {
    imgPath: 'n2019Proyer.jpg',
    title: '2019年12月23日にUniversity of ViennaのMichelle Proyer先生が講演を行いました。',
    href: 'talkProyer-ja.html',
    time: '2019年12月23日',
},
]
resources.map((data) => {
    const aPieceOfNews = document.createElement('div')
    aPieceOfNews.innerHTML = `                    
                    <div class="row">
                        <div class="col s3">
                            <img src="img/news/${data.imgPath ? data.imgPath : 'forNews.png'}" width="100%"  alt=""/>
                        </div>
                        <div class="col s9">
                            ${data.href ? `<a href=${data.href} class="news">${data.title}</a>` : data.title}
                            </br><span class="d">${data.time}</span>
                        </div>
                    </div>
`

    labNews.appendChild(aPieceOfNews)
})
