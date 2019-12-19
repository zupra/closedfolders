<template lang="pug">
.Page

  hr
  pre(
    style="height:3em; overflow-y: auto;resize: vertical;"
  ) {{socket}}
  hr

  //- template()

  .file_list(
    v-for="It in socket.message.folders"
  )
    .It.flex.y_start.mb_3

      //- :src="require(`../static/color-svg/${It.icon}.svg`)"
      img(
        width="39px"
        :src="`../color-svg/${It.icon}.svg`"
      )
      .ml_2
        .text_x2 {{It.foldername}}
        .text_s1 {{It.created}}



  hr

  h1 Files

  .file_list(
    v-for="file in files"
  )
    .file.flex.y_start.mb_3
      img(
        src="https://icongr.am/clarity/file.svg?size=48px"
      )
      div
        .text_x2 {{file.filename}}
        .text_s1 {{file.size}} - {{file.created}}
        .flex
          .badge(v-for="tag in file.tags") {{tag.tagname}}




</template>


<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      files: [
        {
          file_id: 51,
          filename: 'Alien-.-_Covenant_2017_BD_(Eng).mp4',
          size: '2.3 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'thriller',
              tag_id: 3
            },
            {
              tagname: 'science fiction',
              tag_id: 9
            },
            {
              tagname: 'horror',
              tag_id: 14
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/0ade1cc64f4ac172f3ae227d33a9e3e3:2019121812:uid-16/files/dab7b917121e59d6b85bcfd0360e48c5290495dc/Alien-.-_Covenant_2017_BD_(Eng).mp4'
        },
        {
          file_id: 52,
          filename: 'Alien-.-_Resurrection_1997_BD_(Eng).mp4',
          size: '2.19 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'science fiction',
              tag_id: 9
            },
            {
              tagname: 'horror',
              tag_id: 14
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/5e1cfc4867b4434603a6686e70d6269e:2019121812:uid-16/files/4398ab121dd908cf4eaa2ab39aa01f8f7b9cdc8b/Alien-.-_Resurrection_1997_BD_(Eng).mp4'
        },
        {
          file_id: 53,
          filename: 'Aliens_1986_BD_(Eng).mp4',
          size: '2.91 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'thriller',
              tag_id: 3
            },
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'science fiction',
              tag_id: 9
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/3b386a4f367659834a8f93f4fcb2ad30:2019121812:uid-16/files/d63583970bc33c19b53bd202457b49b5c23ec514/Aliens_1986_BD_(Eng).mp4'
        },
        {
          file_id: 54,
          filename: 'Aliens_vs._College_Girls_2017_WEBDL_(Eng).mp4',
          size: '1.6 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'science fiction',
              tag_id: 9
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/d7d381cdfee8768bd61755600c779511:2019121812:uid-16/files/5383a09021b869f2e597f61ac141990cbab7bdb0/Aliens_vs._College_Girls_2017_WEBDL_(Eng).mp4'
        },
        {
          file_id: 50,
          filename: 'Alien_1979_BD_(Eng).mp4',
          size: '2.18 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'science fiction',
              tag_id: 9
            },
            {
              tagname: 'horror',
              tag_id: 14
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/93dd25cab53620f00de2bb37c6066b6b:2019121812:uid-16/files/7b8380b0f1a9bb6d8d392da49c825306359b2fe8/Alien_1979_BD_(Eng).mp4'
        },
        {
          file_id: 55,
          filename: 'Alien³_1992_BD_(Eng).mp4',
          size: '2.73 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'science fiction',
              tag_id: 9
            },
            {
              tagname: 'horror',
              tag_id: 14
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/055127aea4751770fe671d08e27678e4:2019121812:uid-16/files/296530bf5f9d4620cde296557388e196ac7782a5/Alien³_1992_BD_(Eng).mp4'
        },
        {
          file_id: 590,
          filename: 'Allegiant_2016_BD_(Eng).mp4',
          size: '2.27 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'science fiction',
              tag_id: 9
            },
            {
              tagname: 'mystery',
              tag_id: 45
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/af60778f3b2d78714cec36e07f3c1f63:2019121812:uid-16/files/5aa63a070fb0bffd055de241f4124f973d712aa6/Allegiant_2016_BD_(Eng).mp4'
        },
        {
          file_id: 56,
          filename: 'All_Is_Lost_2013_BD_(Eng).mp4',
          size: '1.99 GB',
          created: '2019-12-12 07:19',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'drama',
              tag_id: 11
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/4768b45f6d0b83288004080f5e3a66b7:2019121812:uid-16/files/2a4bf61482135ec6a1f58154791b584e0bd100a6/All_Is_Lost_2013_BD_(Eng).mp4'
        },
        {
          file_id: 589,
          filename: 'All_Through_the_Night_1942_WEBDL_(Eng).mp4',
          size: '2.02 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'comedy',
              tag_id: 1
            },
            {
              tagname: 'thriller',
              tag_id: 3
            },
            {
              tagname: 'crime',
              tag_id: 5
            },
            {
              tagname: 'drama',
              tag_id: 11
            },
            {
              tagname: 'war',
              tag_id: 94
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/0817b295eb3548b6fdc904bfce2ef232:2019121812:uid-16/files/3dae254873be3f45fc11fc655f24c61b020744ab/All_Through_the_Night_1942_WEBDL_(Eng).mp4'
        },
        {
          file_id: 591,
          filename: 'Almost_Heroes_1998_WEBDL_(Eng).mp4',
          size: '1.7 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'comedy',
              tag_id: 1
            },
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'western',
              tag_id: 54
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/1211a6a39a4ded0307bc2b52da6e5efe:2019121812:uid-16/files/8323f6351d1962313022da79996b3d281353a9a6/Almost_Heroes_1998_WEBDL_(Eng).mp4'
        },
        {
          file_id: 592,
          filename: 'Alpha_2018_BD_(Eng).mp4',
          size: '1.8 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'drama',
              tag_id: 11
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/e94978f484956d216db7cad27d75b5ce:2019121812:uid-16/files/c3dac31af44089d184f43dcd562fa3ce454418a7/Alpha_2018_BD_(Eng).mp4'
        },
        {
          file_id: 593,
          filename:
            'Alvin_and_the_Chipmunks-.-_The_Road_Chip_2015_BD_(Eng).mp4',
          size: '1.73 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'comedy',
              tag_id: 1
            },
            {
              tagname: 'family',
              tag_id: 2
            },
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'animation',
              tag_id: 26
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/15a5b8fc1061f6898495d11e7ab3eb80:2019121812:uid-16/files/f0142157e3418a515739bb4ce90ad259cd648ecf/Alvin_and_the_Chipmunks-.-_The_Road_Chip_2015_BD_(Eng).mp4'
        },
        {
          file_id: 594,
          filename: 'Amelia_2009_BD_(Eng).mp4',
          size: '2.1 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'drama',
              tag_id: 11
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/e6b3ce9dc73611c473fc9ce92e8dab2d:2019121812:uid-16/files/7f9e06c8381dc02ffbebdd89969d80d160afd780/Amelia_2009_BD_(Eng).mp4'
        },
        {
          file_id: 595,
          filename: 'American_Beauty_1999_BD_(Eng).mp4',
          size: '2.29 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'drama',
              tag_id: 11
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/5f7e7e8ae9f39f0bfec05e4747b0435b:2019121812:uid-16/files/8903e1394cf886c8ac89e8fcc16bda3dafd54ede/American_Beauty_1999_BD_(Eng).mp4'
        },
        {
          file_id: 596,
          filename: 'American_Dresser_2018_BD_(Eng).mp4',
          size: '1.84 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'adventure',
              tag_id: 8
            },
            {
              tagname: 'drama',
              tag_id: 11
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/fcc00034093a3c2e44ccbcfeabb6b716:2019121812:uid-16/files/f451430f3151115ee5e673e86b2ba3d2b9238556/American_Dresser_2018_BD_(Eng).mp4'
        },
        {
          file_id: 597,
          filename: 'American_Pie_Presents_the_Book_of_Love_2009_BD_(Eng).mp4',
          size: '1.76 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'comedy',
              tag_id: 1
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/edfe441edc4262854482169c486d4605:2019121812:uid-16/files/0a395bc3ab94059c11f9c30d058eac457f168eae/American_Pie_Presents_the_Book_of_Love_2009_BD_(Eng).mp4'
        },
        {
          file_id: 598,
          filename: 'American_Sniper_2014_BD_(Eng).mp4',
          size: '2.49 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'action',
              tag_id: 4
            },
            {
              tagname: 'war',
              tag_id: 94
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/34784198a39002e80f63e256c35b57c0:2019121812:uid-16/files/bc780f7bb50beece4d0f1fe46de58d0f1961cca5/American_Sniper_2014_BD_(Eng).mp4'
        },
        {
          file_id: 599,
          filename: 'American_Ultra_2015_BD_(Eng).mp4',
          size: '1.8 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'comedy',
              tag_id: 1
            },
            {
              tagname: 'action',
              tag_id: 4
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/64c76c24bb54f8a99e18cdf4b64d8845:2019121812:uid-16/files/897c311ae2124a2010f82ca2bfe1cfe8f1a0358a/American_Ultra_2015_BD_(Eng).mp4'
        },
        {
          file_id: 600,
          filename: 'Amy_2015_BD_(Eng).mp4',
          size: '2.41 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'music',
              tag_id: 24
            },
            {
              tagname: 'documentary',
              tag_id: 4437
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/eb31f664661a16a1ccecc21266c65a58:2019121812:uid-16/files/cfbf8c57c0b972f694640874c669bdd01d0e3c77/Amy_2015_BD_(Eng).mp4'
        },
        {
          file_id: 601,
          filename: 'Anna_Karenina_2012_BD_(Eng).mp4',
          size: '2.44 GB',
          created: '2019-12-13 03:07',
          folder_id: 4,
          mp4: 1,
          icon: 'video',
          tags: [
            {
              tagname: 'drama',
              tag_id: 11
            },
            {
              tagname: 'romance',
              tag_id: 18
            }
          ],
          btn: {
            deltag: 1,
            save: 1
          },
          link:
            'https://filezzz_upload.cdn.zerocdn.com/7233cd93f0a55fbd4e241ff1ce224afb:2019121812:uid-16/files/ac54032ea4e8eef9841eb6b9e221bc190096cccc/Anna_Karenina_2012_BD_(Eng).mp4'
        }
      ]
    }
  },
  computed: {
    ...mapState(['socket']),

    folders() {
      return (
        this.socket.isConnected &&
        this.$socket.sendObj({
          cmd: 'folders'
        })
      )
    }
  }
}
</script>



<style lang="stylus" scoped>
// .file_list

.file
  &:hover
    background: #f3f3f3;

.badge
  color: #212529;
  background-color: #c5efd2;
  padding: .3em .5em;

  font-size: 67%;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  // vertical-align: baseline;
  border-radius: .2rem;
  display: inline-block;
  cursor pointer
  & + &
    margin-left: .15rem;
  &:hover
    background #42ac63
</style>