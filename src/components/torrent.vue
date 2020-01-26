<template>
    <li class="torrent-container">

        <span class="torrent-name">
            <a 
                v-if="imdb.length > 1"
                :href="this.getImdbUrl()"
                v-text="title"
                title="See IMDb info"
                target="_blank"
                rel="noopener noreferrer"
            >
            </a>
            <span
                v-else
            >
                {{title}}
            </span>
        </span>
        <button
            @click="addToMyShows(trimImdbId(imdb))"
            class="add"
            title="Add to my shows"
        >
            +
        </button>
        <span class="torrent-magnet">
            <a 
                :href="magnet_url"
                title="Magnet link"
            >
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADkUlEQVRYw7XXy6vVVRQH8M/+nXNfepVSUZTADHqRtyfaSwJ7CKJgWeS4UcMa1EBp3KBJBE2K/oCiQKUCiyRooD0EFdNqUFSmZIN83avnXO/57QZ7H871dJ6ZX/ixfz/O2mt999rftdc+AbdjE8YxiQX5GUMFAXPYhb8MhiV4A1VENFDHpfxMo4b98GU26ve8bnDsHNDnwSoW5Ukv4gLO4jwuZ9aP4r38PSjqeXwJn+VsLsBi3JDHd7CoSaCOd7s4m8rjpSEIzOTxIn7qYvMWJgssxGwPZ4vzOD0Egem2uZ0wi8lqTk0Dt2GkzajErfNWMyiatmM9bGpNgjMDCmbbEASe7DC/xJWspfN50XNVjIziTmJs8xJwBn+m19lhRThJnCCWFAizhAajGL+cWVVRXYFPCHNtXip4Oxf0f8ELXNnFaKO1oIocdB3l7xRVhEicS+z+hZjSNoKJIWIvyAIYreVcz0eRHBbN9zJno1NwKxJhWDoEgaWwjDL2MSwywSJ0IXBzIghrhiCwBlZ2WVlIQWOTQL2bl5icVPLn+iEIrIdb0vZ2RNbbXIFanRi6GI63Xp8YgsAWSTQd3YaWLmoFpuu6WOb2OA+rBgi+PBdQ+9yrCOS0XyxwtkboRmAET7eE/NgABB7JJ1FjtIfwcmM5F3K32vQHZS2XRodDO97V2s/Qh8AcKsfSIRS61eiqJLGvCvwKB3t4HCU80KqGwz1Mv0VlisZED6JHEsmA36o4AftwXw/PHxI2EE9xb97Cz/FD/vkOPIXxZZR7qZQ9fO1rZfp4yOr+YjnlgS5b0ESV+Ao+6rwVcRvxTULZZ5s2Up5MsTaHLNaLYzimD4Ms7wrxU+LRXM53U92SAzf6zC+TvVq+OzaZ7sfjeynXUkTXD78QN6UMfYOHmgTuwZEx4okep9e1IqTVlzMp0etwqJnxozhdJ3xNGa5T8MOt4H/jULuQVqS7B98Rb+xf70PhAvH+FpebcEqb5s7gZdhObPyPwRuUz7aC72wG73aqvY8dq4l70q3xmjQxQ9xO/Dktdnda39Vb0wkf4PlA/Dgdw8WwGangR8qtqTQD9uCZTn2hE3bg1UjYSrGB8lyHS2u3O8R54kYamxPxgNc6BR+ksazK59OS3N+tp/EcYYq4MLfdGRrfE3YTD1C5fJX2rMXJa9XRutRDBvr/EHEcDw5ansNgJR7Op+nqeRemel7l0dxYTw3q8B9B4SMHlD7GdQAAAABJRU5ErkJggg=="
                    alt="Magnet link"
                />
            </a>
        </span>
        <span class="torrent-size" title="File size">
            {{ this.parseSize(size_bytes) }}
        </span>
        <span class="torrent-post-date" title="Added">
            {{ this.parsePosted(date_released_unix) }}
        </span>
            <div class="seeds-bg" title="Seeds">
                <span class="torrent-seeds">
                    {{seeds}}
                    <!-- <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAED0lEQVRYw71XS08TURQuoexwh5EfoBWotrTytJ0WSCAxAipRqgSIL0h4SYOvTl9DoUjAKBDja6GJRo1QSytQxFeiKzb8B1m4UaLGGFcar+fcmbZ02hmmSG1yMzOdOfec+53vnPtdlSrFzzjZqap5OxJ7ZsKeHOvC4DYm6Kq1znOTcL9sXeDW4EqqIr4/8N8a/W+em2JC7joYuUzIkxO1J4SoNvWrfGhXW+a8OnA2bo34vlW9GCJKhjUy+B2CGQPb4pK79my6iFmXMqeWsIdezQHndljVFeui74tSx0lj0YfIjJpmHHl07udeeecAsUqIVgvGK5t2LB4R3woz6zbQuUPuLPmVTzsqwOjrljmPj0/mZ2w19TW3DgnjRGccAVx5ZpxHx0cgtCFh5VG2Y863FHbpdLw3B107ktiOhEtnoupXfiAZnZC/T8PWMs95TQFWbQ44hPxjqSll+9IwjCFSdqeX6IfbiA5G6e0eZDz/Tll1/LSE3Tv5vEPDgJodT6O0iPF6BymwHya7+xr40X+IGK+dhfr3pYPCFA0AO5zSJoOdD51r0Om5xoSh6aknhvHTioPA73RDrWqs/VolsFvmOGK4eoZoug8mOY8FAe/0/nYCiCpKBxNy2VTY22XJ9tIPH7qJfqSd7OqSdr4eib1cC2GCTmq7QRoeYwqW5ZhunmHphJre+g2dxwakaI/7ODE9dUAQw3IpXYUAuM8pPwBD0zRLtC6brCNNb4PEu0aidRwjZghCMh2Lvl8quqWmeIkrL7p0lGe51Cq9LaR49KQ0OhBEwcARCIKVREGF+3kSOYIuaijpHAb2ANqIoCyLx07JoMQHaw6wKZFAEq6J8673t1EypZywv5GWW1W03Jb4kjJOdNB+IIUWlBypfj0iTsHvJBJiAIUXmvjIU0y2b7KT9oOE1cA9dFJScrNbEjUt20xq3oyISfgBEZgSlx2WnBgBfC69JdNyl/hr+b1+nph9ibaIkHjPAN9PUCDUJdUn1H3h+SaeXALTK+7bY042GvsfXaStGu2xOel8rXzgYj9hjw0DyEUNl1Sj84OkDDaZkhtdBNSM8o0mmhKwr3wwAL3gcmpbIH8R26yObkZjqSBFyChs6Thfb49NSMIWO3BMD1hBvaKAzLgYibP/hyXk0cQCqADpjOr1/zinq3czAUc2qLD4ocE048xD9ZrpAKBnvANJlp8ox2fd0asB1WsGoV+1hr3lghASyXLh0IDSGdVrJpxDiz/Ac46TOJgIhwaUzqhetyznADsjrBxqP0v+aCYcGlA6o3pFAfkvbEfCmYPOfH5uLr3DKUpnVK8oINMRnMKJeRJLDaR3toBu+qdj2EJj9ygggTg2lFGoZFBMrN/VcGPB3o7ttYg9oY7P4ZT18ReTIuTJWRGvJgAAAABJRU5ErkJggg=="
                        alt="Up arrow respresenting seeders"
                        title="Seeders"
                    /> -->
                </span>
            </div>
         <!-- <span class="torrent-peers">
            {{peers}}
        </span> -->
    </li>  
</template>

<style scoped>
li {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    margin: 4px 0px;
    /* border: 1px solid #666; */
    border-radius: 3px;
    align-items: center;
    background-color: rgba(255,255,255,0.05);
}
li:nth-child(2n-1) {
    background-color: rgba(255,255,255,0.15);
}
a {
    color:rgb(230, 230, 255);  
}
a:visited {
    color:rgb(220, 200, 250);
}
span {
    line-height: 1.5em;
    padding: 0 2px;
}
span.torrent-name {
    width: 57%;
    /* min-width: 59%; */
}
button.add {
  color: rgba(255,255,255,0.4);
  font-weight: bold;
  font-size: 1.4em;
  background-color: #42ae81;
  align-self: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0px 5px;
  margin: 0 2px;
}
span.torrent-size {
    width: 8%;
    max-width: 64px;
    /* min-width: 9%; */
    font-size: 0.8em;
}

span.torrent-post-date {
    width: 8%;
    max-width: 64px;
    /* min-width: 11%; */
    font-size: 0.8em;
    
}
div.seeds-bg {
    display: flex;
    justify-content: center;
    align-items:flex-end;
    height: 2em;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrElEQVRYw2NgIAI4bG9iBWJeIPYA4klAfBKI3wDxfyD+B8RvoWIgOU8g5gHpYaAUAA1hAWI9IO4G4o9QC4nBn6B6DICYmVzLxYC4A4jfoVtgt7n+v/HE9P8aRQH/1Qv8/xt2J/2321iHzSFvoGaIkmq5DhCfweY7m3XV//VaYv+r5/mhYJ2aiP/WqypxhQjILCOo2YyELLcC4vfYDAJZoFMXiWE5DGtVhv23XFqKyxEvgdiFGJ+jWG6/rRFMWwEN1iwNxmk5DGsUBf63WFiEyxFPgNgYX5xjDXbz+YXguCZkOTI2m5WLyxGHgFgCW2rvwKbBbGbuf/V80iyHYePJGfAQRMP1IDuRHaCHntrttzaCDcBrOShUCISMYU/yf7tNGDnkKxArIxcy3ejxbtCVhN+HQItBwQyKHo3CALxq9Vrj/ttuqEV3xGSYA3jRCxmjCWmEE9qCQkQCXVFOMIGCyg0sUcHCAC1eUSTABQwOg0AWWSwqxppFtavCcOrTrg7H5oAoBmj5jeoAHEGqDcznVsvKcBbBNmuq/uvUR2HVq1MXhU3PCgZoJYIiAQoudAN0G6PBFiCXDdiw7fqa//pt8ZjZcnYeNvWPGJBqNZSy3mRa1n+d2khwEWsyJRNbIsKJ7TbV/zebk/dfvz3hv0FnIjih2m9twKb2DwMJNRxNMAO0Ph9QB7wdQAf8wZoI6YgfYs2GdMTLGaBtuIFyALgg4oG24QbCAaxYKyM64UnI1bEBtgKJhvgLEKshO4AZV4OERrgOpUECdYQoriYZlfFBIJbE1S40grZeaZbvgdiCUMvYBdp6pYXl3oQsZ4TSxtDWKzWD3YKojgmSYySgrdevFKb2OpxxTmTnVBnUgCQnn4OyGkZqp7CnHAVqRoFaMqCaDLlWg8bxcqgaorvmAPnTyqo7BW8MAAAAAElFTkSuQmCC');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-x: center;
    opacity: 0.9;
    width: 9%;
    max-width: 64px;
}
span.torrent-seeds {
    /* border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.4) */
    font-weight: bold;
    font-size: 0.8em;
    color: #ffffff;
    -webkit-text-stroke: rgba(0,0,0,0.5) 0.5px;

}
span.torrent-magnet {
    padding: 0 3px;
}
span.torrent-magnet a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
}
img {
    width: 24px;
    opacity: 0.7;
}
@media screen and (min-width: 640px) {
    span.torrent-size {
    font-size: 0.9em;
    }
    span.torrent-post-date {
        font-size: 0.9em;
    }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Torrent',
    data: function() {
        return {
            imdbBase: 'https://www.imdb.com/title/tt',
            imdbId: this.imdb,
            getImdbUrl: function() {
                return this.imdbBase + this.imdbId
            }
        }
    },
    props : {
        title: String,
        magnet_url: String,
        size_bytes: String,
        date_released_unix: Number,
        seeds: Number,
        peers: Number,
        imdb: String
    },
    methods: {
        ...mapMutations([
            'addToMyShows'
        ]),
        parseSize: function(size_str) {
            let output = '';
            const bytes_int = parseInt(size_str);
            if (bytes_int < (1024**3)) {
                output = Math.round(bytes_int/(1024**2)).toString() + ' MiB'
            }
            if (bytes_int >= (1024**3)) {
                output = Math.round(bytes_int/(1024**3)).toString() + ' GiB'
            }
            return output;
        },
        parsePosted: function(n) {
            if (typeof n !== 'number') return;
            let output = '';
            const secs = Date.now() / 1000 - n;
            if (secs < 60) {
                const seconds = Math.round(secs);
                output = seconds.toString() + ' secs';
            }
            else if (secs < 3600) {
                const mins = Math.round(secs/60);
                const suffix = (mins === 1) ? ' min' : ' mins';
                output = mins.toString() + suffix;
            }
            else if (secs < 86400) {
                const hours = Math.round(secs/3600);
                const suffix = (hours === 1) ? ' hour' : ' hours';
                output = hours.toString() + suffix;
            }
            else if (secs < 604800) {
                const days = Math.round(secs/86400);
                const suffix = (days === 1) ? ' days' : ' days';
                output = days.toString() + suffix;
            }
            else if (secs < 4233600) {
                const weeks = Math.round(secs/604800);
                const suffix = (weeks === 1) ? ' week' : ' weeks';
                output = weeks.toString() + suffix;
            }
            else if (secs < 18144000) {
                const months = Math.round(secs/2592000);
                const suffix = (months === 1) ? ' month' : ' months';
                output = months.toString() + suffix;
            }
            else {
                const years = Math.round(secs/31536000);
                const suffix = (years === 1) ? ' year' : ' years';
                output = years.toString() + suffix;
            }
        return output;
        },
        trimImdbId(imdbId) {
        return imdbId.replace(/tt/,'')
        },
    }
}
</script>