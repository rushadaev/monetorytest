<template>
  <Button @click="openModal">Выбрать теги</Button>
  <transition name="fade">
  <Modal :isOpen="isModalOpen" @update:isOpen="updateModalOpen" @save="saveTags">
    <template v-slot:header>
      <h2>Добавление тегов</h2>
      <p :class="{'warning': shakeTags}">Вы можете добавить ещё <b>{{20 - selectedTags.length}}</b></p>
    </template>
    <SearchInput label="Название тега" class="ml-10 mt-10 mr-10" @update:search="updateSearch" />
    <div v-if="search.length > 0 && foundTags.length == 0" class="ml-10 mt-5 mr-10 search-results-info">
      {{tags.length > 0 ? 'По запросу ничего не найдено' : 'При получении данных возникла ошибка'}}
    </div>
    <div class="tag-list p-5 pl-10 pr-10 flex flex-wrap gap-3">
      <Tag :class="{'shake': shakeTags}" @click="selectTag(tag)" v-for="tag in foundTags">{{tag.name}}</Tag>
    </div>
    <div v-if="selectedTags.length > 0" class="chosen-tags-list p-5 pl-10 flex flex-wrap gap-3">
      <Tag @click="removeTag(index)" v-for="(tag, index) in selectedTags" :icon="'close'">{{ tag.name }}</Tag>
    </div>
  </Modal>
  </transition>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue'
import { useStore } from './stores'
import Modal from './components/Modal.vue'
import Button from './components/Button.vue'
import SearchInput from './components/SearchInput.vue'
import Tag from "./components/Tag.vue";

export default defineComponent({
  components: {
    Tag,
    Modal,
    Button,
    SearchInput
  },
  setup() {
    const store = useStore()
    const isModalOpen = ref(false)
    const search = ref('')

    const tags = computed(() => store.tags);
    const foundTags = computed(() => store.foundTags.filter(tag => !store.selectedTags.includes(tag)).slice(0,20));
    const selectedTags = computed(() => store.selectedTags)
    const shakeTags = ref(false);

    const openModal = () => {
      isModalOpen.value = true
      store.setSelectedTags([...store.savedTags]);
      search.value = ""
      store.setFoundTags([])
    }

    const updateModalOpen = (value) => {
      isModalOpen.value = value
    }

    const selectTag = (tag, $event) => {
      if(selectedTags.value.length < 20)
      {
        let dataToUpdate = [...store.selectedTags];
        dataToUpdate.push(tag)
        store.setSelectedTags(dataToUpdate);
      }
      else{
        shakeTags.value = true;
        setTimeout(() => {
          shakeTags.value = false;
        }, 500)
      }
    }

    const removeTag = (index) => {
      let dataToUpdate = [...store.selectedTags];
      dataToUpdate.splice(index, 1)
      store.setSelectedTags(dataToUpdate);
    }

    const updateSearch = (value) => {
      search.value = value.toLowerCase();
      let foundedTags = [];
      if(search.value.length > 0 ) {
        foundedTags = tags.value.filter(tag => {
          return tag.name.toLowerCase().includes(search.value) || tag.aliases.filter(alias => alias.toLowerCase().includes(search.value)).length > 0;
        })
      }else{
        foundedTags = [];
      }
      store.setFoundTags(foundedTags);


    }

    const saveTags = () => {
      // Save selected tags to the store
      store.setSavedTags(selectedTags.value)
      isModalOpen.value = false
    }

    onMounted(() => {
      getData()
    })

    const getData = () => {
      return new Promise((resolve, reject) => {
        const data = [{
          "id": 1,
          "name": "Товары",
          "categories": [{
            "id": 1,
            "name": "Электроника",
            "subcategories": [{
              "id": 1,
              "name": "Телефоны и смарт-часы",
              "tags": [{
                "id": 1,
                "name": "Смартфоны",
                "aliases": [
                  "Телефон",
                  "mobile",
                  "iphone"
                ]
              },
                {
                  "id": 2,
                  "name": "Смарт-часы и фитнес-браслеты",
                  "aliases": []
                },
                {
                  "id": 3,
                  "name": "SIM-карты",
                  "aliases": []
                },
                {
                  "id": 4,
                  "name": "Мобильные телефоны",
                  "aliases": []
                }
              ]
            },
              {
                "id": 2,
                "name": "Моноблоки и системные блоки",
                "tags": [{
                  "id": 5,
                  "name": "Системные блоки",
                  "aliases": []
                },
                  {
                    "id": 6,
                    "name": "Моноблоки",
                    "aliases": []
                  }
                ]
              },
              {
                "id": 3,
                "name": "Офисная техника",
                "tags": [{
                  "id": 7,
                  "name": "Принтеры",
                  "aliases": []
                },
                  {
                    "id": 8,
                    "name": "МФУ",
                    "aliases": []
                  },
                  {
                    "id": 9,
                    "name": "Сканеры",
                    "aliases": []
                  }
                ]
              },
              {
                "id": 4,
                "name": "Телевизоры и видеотехника",
                "tags": [{
                  "id": 10,
                  "name": "Телевизоры",
                  "aliases": []
                },
                  {
                    "id": 11,
                    "name": "Кронштейны",
                    "aliases": []
                  }
                ]
              }
            ]
          },
            {
              "id": 2,
              "name": "Одежда",
              "subcategories": [{
                "id": 5,
                "name": "Женщинам",
                "tags": [{
                  "id": 12,
                  "name": "Брюки, бриджи и капри",
                  "aliases": []
                },
                  {
                    "id": 13,
                    "name": "Верхняя одежда",
                    "aliases": []
                  }
                ]
              },
                {
                  "id": 6,
                  "name": "Мужчинам",
                  "tags": [{
                    "id": 14,
                    "name": "Брюки",
                    "aliases": []
                  },
                    {
                      "id": 15,
                      "name": "Верхняя одежда",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 7,
                  "name": "Детям",
                  "tags": [{
                    "id": 16,
                    "name": "Девочкам",
                    "aliases": []
                  },
                    {
                      "id": 17,
                      "name": "Мальчикам",
                      "aliases": []
                    },
                    {
                      "id": 18,
                      "name": "Новорожденным",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 8,
                  "name": "Спецодежда",
                  "tags": [{
                    "id": 19,
                    "name": "Медицинская одежда",
                    "aliases": []
                  },
                    {
                      "id": 20,
                      "name": "Сигнальная одежда",
                      "aliases": []
                    }
                  ]
                }
              ]
            },
            {
              "id": 3,
              "name": "Обувь",
              "subcategories": [{
                "id": 9,
                "name": "Мужчинам",
                "tags": [{
                  "id": 21,
                  "name": "Домашняя обувь",
                  "aliases": []
                },
                  {
                    "id": 22,
                    "name": "Ботинки и полуботинки",
                    "aliases": []
                  }
                ]
              },
                {
                  "id": 10,
                  "name": "Женщинам",
                  "tags": [{
                    "id": 23,
                    "name": "Балетки",
                    "aliases": []
                  },
                    {
                      "id": 24,
                      "name": "Босоножки",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 11,
                  "name": "Детям",
                  "tags": [{
                    "id": 25,
                    "name": "Девочкам",
                    "aliases": []
                  },
                    {
                      "id": 26,
                      "name": "Мальчикам",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 12,
                  "name": "Уход и аксессуары",
                  "tags": [{
                    "id": 27,
                    "name": "Чехлы на обувь",
                    "aliases": []
                  },
                    {
                      "id": 28,
                      "name": "Губки",
                      "aliases": []
                    }
                  ]
                }
              ]
            },
            {
              "id": 4,
              "name": "Дом и Сад",
              "subcategories": [{
                "id": 13,
                "name": "Посуда",
                "tags": [{
                  "id": 29,
                  "name": "Столовая посуда",
                  "aliases": []
                },
                  {
                    "id": 30,
                    "name": "Столовые приборы",
                    "aliases": []
                  },
                  {
                    "id": 31,
                    "name": "Детская посуда",
                    "aliases": []
                  }
                ]
              },
                {
                  "id": 14,
                  "name": "Текстиль",
                  "tags": [{
                    "id": 32,
                    "name": "Шторы и карнизы",
                    "aliases": []
                  },
                    {
                      "id": 33,
                      "name": "Постельное белье",
                      "aliases": []
                    },
                    {
                      "id": 34,
                      "name": "Одеяла",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 15,
                  "name": "Дача и сад",
                  "tags": [{
                    "id": 35,
                    "name": "Отдых и пикник",
                    "aliases": []
                  },
                    {
                      "id": 36,
                      "name": "Садовая мебель",
                      "aliases": []
                    },
                    {
                      "id": 37,
                      "name": "Садовый инструмент",
                      "aliases": []
                    }
                  ]
                },
                {
                  "id": 16,
                  "name": "Товары для бани и сауны",
                  "tags": [{
                    "id": 38,
                    "name": "Веники для бань",
                    "aliases": []
                  },
                    {
                      "id": 39,
                      "name": "Банный текстиль",
                      "aliases": []
                    },
                    {
                      "id": 40,
                      "name": "Ведра и кадки",
                      "aliases": []
                    }
                  ]
                }
              ]
            }
          ]
        },
          {
            "id": 2,
            "name": "Сырье",
            "categories": [{
              "id": 5,
              "name": "Металлы и сплавы",
              "subcategories": [{
                "id": 17,
                "name": "Черные металлы и сплавы",
                "tags": [{
                  "id": 41,
                  "name": "Сталь",
                  "aliases": []
                },
                  {
                    "id": 42,
                    "name": "Чугун",
                    "aliases": []
                  }
                ]
              },
                {
                  "id": 18,
                  "name": "Цветные металлы и сплавы",
                  "tags": [{
                    "id": 43,
                    "name": "Алюминий",
                    "aliases": []
                  },
                    {
                      "id": 44,
                      "name": "Олово",
                      "aliases": []
                    },
                    {
                      "id": 45,
                      "name": "Медь",
                      "aliases": []
                    }
                  ]
                }
              ]
            },
              {
                "id": 6,
                "name": "Резина",
                "subcategories": [{
                  "id": 19,
                  "name": "Резины общего назначения",
                  "tags": [{
                    "id": 46,
                    "name": "Натуральный каучук",
                    "aliases": []
                  },
                    {
                      "id": 47,
                      "name": "Синтетический каучук бутадиеновый",
                      "aliases": []
                    },
                    {
                      "id": 48,
                      "name": "Синтетический каучук изопреновый",
                      "aliases": []
                    }
                  ]
                },
                  {
                    "id": 20,
                    "name": "Резины специального назначения",
                    "tags": [{
                      "id": 49,
                      "name": "Наирит",
                      "aliases": []
                    },
                      {
                        "id": 50,
                        "name": "Бутадиеннитрильный каучук",
                        "aliases": []
                      },
                      {
                        "id": 51,
                        "name": "Тиокол",
                        "aliases": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": 3,
            "name": "Технологии",
            "categories": [{
              "id": 7,
              "name": "3D печать",
              "subcategories": [{
                "id": 21,
                "name": "3D печать",
                "tags": [{
                  "id": 52,
                  "name": "Прототипирование методом наплавления",
                  "aliases": [
                    "FDM"
                  ]
                },
                  {
                    "id": 53,
                    "name": "Селективное лазерное спекание",
                    "aliases": [
                      "SLS"
                    ]
                  },
                  {
                    "id": 54,
                    "name": "Лазерная стереолитография",
                    "aliases": [
                      "SLA"
                    ]
                  },
                  {
                    "id": 55,
                    "name": "Электронно-лучевая плавка",
                    "aliases": [
                      "EBM"
                    ]
                  },
                  {
                    "id": 56,
                    "name": "Производство моделей с использованием ламинировани",
                    "aliases": [
                      "LOM"
                    ]
                  },
                  {
                    "id": 57,
                    "name": "Многоструйное моделирование",
                    "aliases": [
                      "MJM"
                    ]
                  }
                ]
              }]
            }]
          }
        ]
        setTimeout(() => {
          if (Math.random() * 100 < 7) {
            reject({ error: 'Ooops...' })
          } else {
            resolve(data);
            let tags = data.flatMap(item =>
                item.categories.flatMap(category =>
                    category.subcategories.flatMap(subcategory =>
                        subcategory.tags
                    )
                )
            );
            store.setTags(tags)
          }
        }, Math.floor(Math.random() * 2000));
      });
    };

    return {
      isModalOpen,
      openModal,
      updateModalOpen,
      search,
      updateSearch,
      saveTags,
      tags,
      foundTags,
      selectedTags,
      selectTag,
      removeTag,
      shakeTags
    }
  }
})
</script>

<style scoped lang="scss">
.chosen-tags-list{
  border-top: 1px solid #ECEDF2;
}
.search-results-info{
  color: #8C8F97;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
}
</style>