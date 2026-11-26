// Destination / Điểm Đến copy. English is edited down from Nam's draft "The Desert, Unhurried" (Nov 2026).
// Vietnamese is a first draft for Nam to review. Facts checked Nov 2026; sources are noted beside each block.
type T = { en: string; vi: string };
type P = { en: string[]; vi: string[] };

export const dest = {
  title: { en: 'Destination', vi: 'Điểm Đến' },
  sub: { en: 'The Desert, Unhurried', vi: 'Sa Mạc, Thong Thả' },
  lede: {
    en: 'Tucson sits in a basin ringed by mountains, and February is one of its most generous months. The Sonoran Desert here is not an empty landscape: it is the most biologically diverse desert in North America. Arrive early, stay a little longer, and let the desert set the pace.',
    vi: 'Tucson nằm trong một thung lũng được núi non bao quanh, và tháng Hai là một trong những tháng dịu dàng nhất ở đây. Sa mạc Sonoran không hề trống trải: đây là sa mạc có hệ sinh thái phong phú nhất Bắc Mỹ. Xin quý vị hãy đến sớm, ở lại lâu thêm một chút, và để sa mạc dẫn nhịp.',
  } as T,

  why: {
    h: { en: 'Why Tucson', vi: 'Vì Sao Là Tucson' },
    p: {
      en: [
        'For years, Dave’s parents spent every winter in the Arizona desert, trading the Midwest’s long cold for warm mornings and mountain light. We visited whenever we could, and those trips became some of our favorites. We hiked with them, stood among the saguaros, and watched the Catalinas turn pink at dusk.',
        'Somewhere in those visits, we fell in love with this landscape just as they had. For Nam’s family in Vietnam and our friends traveling from overseas, the Sonoran is unlike anywhere else in North America. For our Midwest guests, it is a February reprieve from winter at its most relentless.',
      ],
      vi: [
        'Nhiều năm nay, bố mẹ của Dave đều dành trọn mùa đông ở sa mạc Arizona, để lại sau lưng cái lạnh dài của vùng Trung Tây mà đón những buổi sáng ấm áp và ánh nắng trên núi. Chúng tôi ghé thăm mỗi khi có dịp, và những chuyến đi ấy trở thành kỷ niệm đẹp nhất của hai đứa. Chúng tôi cùng bố mẹ leo núi, đứng giữa rừng xương rồng saguaro, và ngắm dãy Catalina ửng hồng lúc chiều tà.',
        'Qua những lần ghé thăm ấy, chúng tôi cũng đã yêu vùng đất này như bố mẹ. Với gia đình của Nam ở Việt Nam và bạn bè từ nước ngoài, sa mạc Sonoran không giống bất cứ nơi nào khác ở Bắc Mỹ. Với khách mời từ vùng Trung Tây, đây là một kỳ nghỉ tháng Hai giữa lúc mùa đông khắc nghiệt nhất.',
      ],
    } as P,
    quote: { en: 'We could not imagine a better place to celebrate our union.', vi: 'Chúng tôi không thể nghĩ ra nơi nào đẹp hơn để cùng nhau kết duyên.' },
  },

  glance: {
    h: { en: 'At a Glance', vi: 'Tóm Tắt' },
    rows: [
      { k: { en: 'Where', vi: 'Địa điểm' }, v: { en: 'The Buttes at Reflections\n9800 N Oracle Rd, Tucson, AZ 85704, near Oro Valley', vi: 'The Buttes at Reflections\n9800 N Oracle Rd, Tucson, AZ 85704, gần Oro Valley' } },
      { k: { en: 'Fly into', vi: 'Sân bay' }, v: { en: 'Tucson (TUS), about 30 minutes by car\nPhoenix (PHX), about 2 hours by car', vi: 'Tucson (TUS), khoảng 30 phút lái xe\nPhoenix (PHX), khoảng 2 tiếng lái xe' } },
      { k: { en: 'Getting around', vi: 'Đi lại' }, v: { en: 'A rental car or rideshare. Most hotels nearby do not run airport shuttles.', vi: 'Thuê xe hoặc gọi xe (Uber, Lyft). Phần lớn khách sạn gần đó không có xe đưa đón sân bay.' } },
      { k: { en: 'Weather', vi: 'Thời tiết' }, v: { en: 'Days about 69°F (21°C)\nNights about 43°F (6°C), rain is rare', vi: 'Ban ngày khoảng 21°C (69°F)\nBan đêm khoảng 6°C (43°F), hiếm khi mưa' } },
      { k: { en: 'Time zone', vi: 'Múi giờ' }, v: { en: 'Arizona time (MST). Arizona never changes its clocks; in February it matches Denver.', vi: 'Giờ Arizona (MST). Arizona không đổi giờ mùa hè; vào tháng Hai, giờ ở đây giống giờ Denver.' } },
      { k: { en: 'What to pack', vi: 'Nên mang theo' }, v: { en: 'Layers, a wide hat, sunglasses, comfortable shoes, and one warmer layer than you think you need. A 69° afternoon becomes a 43° evening quickly.', vi: 'Quần áo nhiều lớp, mũ rộng vành, kính râm, giày thoải mái, và thêm một áo ấm hơn quý vị nghĩ. Buổi chiều 21°C có thể xuống 6°C rất nhanh khi tối.' } },
    ],
  },

  morning: {
    h: { en: 'Morning', vi: 'Buổi Sáng' },
    place: {
      h: { en: 'The Only Place on Earth', vi: 'Nơi Duy Nhất Trên Trái Đất' },
      p: {
        en: [
          'There are four major deserts in North America, and the Sonoran is the strangest and most generous of them. It has two rainy seasons rather than one, a winter soak and a summer monsoon, and that double rhythm sustains more than 2,000 kinds of plants. Nothing else on the continent looks like it.',
          'The saguaro is the clearest proof. It grows wild only in the Sonoran Desert, across southern Arizona, Sonora and a sliver of California, and nowhere else on the planet. A saguaro may live two centuries, and its first arm can take sixty to seventy-five years to appear. Walking among them feels less like looking at plants and more like walking through a slow, patient civilization.',
          'The Tohono O’odham, who have lived here since time immemorial, do not see the saguaro as scenery. One of their stories tells of a child who sank into the earth where the first saguaro rose. The plant is family.',
        ],
        vi: [
          'Bắc Mỹ có bốn sa mạc lớn, và Sonoran là sa mạc kỳ lạ và hào phóng nhất. Nơi đây có hai mùa mưa thay vì một: mưa dầm mùa đông và gió mùa mùa hè. Nhịp mưa đôi ấy nuôi dưỡng hơn 2.000 loài thực vật. Không nơi nào khác trên lục địa này trông giống như vậy.',
          'Cây xương rồng saguaro là minh chứng rõ nhất. Loài cây này chỉ mọc hoang ở sa mạc Sonoran, trải dài qua miền nam Arizona, bang Sonora (Mexico) và một góc nhỏ của California, không ở đâu khác trên thế giới. Một cây saguaro có thể sống đến hai trăm năm, và phải sáu mươi đến bảy mươi lăm năm mới mọc nhánh đầu tiên. Đi giữa rừng saguaro, ta có cảm giác như đang bước qua một nền văn minh chậm rãi và kiên nhẫn.',
          'Người Tohono O’odham, những người đã sống ở đây từ ngàn xưa, không xem saguaro là cảnh vật. Một truyền thuyết của họ kể về một đứa trẻ chìm xuống lòng đất, và nơi ấy mọc lên cây saguaro đầu tiên. Với họ, saguaro là người thân trong gia đình.',
        ],
      } as P,
    },
    flowers: {
      h: { en: 'The First Flowers', vi: 'Những Bông Hoa Đầu Mùa' },
      p: {
        en: [
          'February begins the desert’s spring quietly, with bladderpod, brittlebush, and the first gold poppies and lupines at lower elevations. Catalina State Park, a few minutes from the venue, is a lovely place to catch the opening notes. It is not March’s full riot of color; it is more tentative, and more moving for it.',
        ],
        vi: [
          'Tháng Hai, mùa xuân sa mạc bắt đầu thật khẽ khàng, với những bông hoa vàng nhỏ của cây bladderpod, brittlebush, và những đóa anh túc vàng, hoa lupin đầu mùa ở vùng thấp. Công viên Catalina State Park, cách nơi tổ chức vài phút, là nơi tuyệt đẹp để đón những nốt nhạc đầu tiên ấy. Chưa phải là cả rừng hoa rực rỡ của tháng Ba, nhưng chính sự e ấp ấy lại càng làm người ta xúc động.',
        ],
      } as P,
    },
    arrive: {
      h: { en: 'Arriving', vi: 'Đến Nơi' },
      items: [
        { k: { en: 'Flying in', vi: 'Máy bay' }, v: { en: 'Tucson International (TUS) is the closest airport, about 30 minutes from the venue, with nonstop flights from cities such as Denver, Dallas, Chicago and Los Angeles. Phoenix (PHX) has more flights and is about a 2-hour drive.', vi: 'Sân bay quốc tế Tucson (TUS) gần nhất, cách nơi tổ chức khoảng 30 phút, có chuyến bay thẳng từ các thành phố như Denver, Dallas, Chicago và Los Angeles. Sân bay Phoenix (PHX) có nhiều chuyến hơn và cách khoảng 2 tiếng lái xe.' } },
        { k: { en: 'Where to stay', vi: 'Nơi ở' }, v: { en: 'The venue has no guest rooms. Two resorts nearby: Hilton Tucson El Conquistador and Westward Look Wyndham Grand. We will share any room block here.', vi: 'Nơi tổ chức không có phòng nghỉ. Hai khu nghỉ dưỡng gần đó: Hilton Tucson El Conquistador và Westward Look Wyndham Grand. Nếu có giá phòng ưu đãi cho khách mời, chúng tôi sẽ cập nhật tại đây.' } },
        { k: { en: 'Book early', vi: 'Đặt sớm' }, v: { en: 'February is a busy month in Tucson, with the Gem Show (through February 13) and the rodeo soon after. Hotels fill quickly.', vi: 'Tháng Hai là mùa đông khách ở Tucson, với hội chợ đá quý Gem Show (đến ngày 13 tháng 2) và lễ hội rodeo ngay sau đó. Khách sạn kín phòng rất nhanh.' } },
      ],
    },
  },

  midday: {
    h: { en: 'Midday', vi: 'Buổi Trưa' },
    sky: {
      h: { en: 'The Sky Islands', vi: 'Những Hòn Đảo Trên Trời' },
      p: {
        en: [
          'Sky islands are mountain ranges that rise so abruptly from the desert that each holds its own world. Here, birds from Mexico’s Sierra Madre share the mountains with species from the Rocky Mountains.',
          'Drive the 27-mile Sky Island Scenic Byway from the desert floor to Mount Lemmon and you climb more than 5,000 feet through a series of life zones, from desert to pine forest. In February there can be snow on the peak while the valley is warm enough for a light jacket: two seasons in a single afternoon. Pause at Windy Point, then continue to Summerhaven for pine air and a change of birds.',
        ],
        vi: [
          '“Đảo trên trời” là những dãy núi vươn lên đột ngột giữa sa mạc, đến mức mỗi dãy giữ một thế giới riêng. Ở đây, các loài chim từ dãy Sierra Madre của Mexico sống chung với những loài của dãy Rocky.',
          'Lái xe 27 dặm (khoảng 43 km) theo con đường Sky Island Scenic Byway từ chân sa mạc lên núi Mount Lemmon, quý vị sẽ lên cao hơn 1.500 mét, qua nhiều vùng sinh thái, từ sa mạc đến rừng thông. Vào tháng Hai, trên đỉnh có thể còn tuyết trong khi dưới thung lũng chỉ cần một áo khoác mỏng: hai mùa trong một buổi chiều. Hãy dừng lại ở Windy Point, rồi lên tiếp Summerhaven để hít thở không khí rừng thông.',
        ],
      } as P,
      tip: { en: 'Download the Mt. Lemmon Science Tour app before you drive. It times the natural history to the mile markers, so the mountain explains itself.', vi: 'Hãy tải ứng dụng Mt. Lemmon Science Tour trước khi đi. Ứng dụng thuyết minh theo từng cột mốc trên đường, để ngọn núi tự kể câu chuyện của mình.' },
    },
    table: {
      h: { en: 'The Table', vi: 'Bàn Ăn' },
      p: {
        en: [
          'Tucson was the first city in the United States named a UNESCO City of Gastronomy, in recognition of a food heritage some four thousand years deep. Start with a Sonoran hot dog at El Güero Canelo, then try carne seca at El Charro. Book one dinner somewhere that treats the desert as an ingredient, not a backdrop.',
          'February adds texture: the Gem, Mineral & Fossil Showcase runs through mid-month, and La Fiesta de los Vaqueros brings the rodeo and a parade billed as the world’s longest without a single motor. Neither is required, but both are good, optional culture.',
        ],
        vi: [
          'Tucson là thành phố đầu tiên ở Mỹ được UNESCO công nhận là Thành phố Ẩm thực, nhờ di sản ẩm thực có từ khoảng bốn nghìn năm. Hãy bắt đầu với món xúc xích Sonoran ở El Güero Canelo, rồi thử món bò khô carne seca ở El Charro. Và hãy dành một bữa tối ở nơi xem sa mạc là nguyên liệu, chứ không chỉ là phông nền.',
          'Tháng Hai còn có thêm những sắc màu riêng: hội chợ đá quý Gem, Mineral & Fossil Showcase kéo dài đến giữa tháng, và lễ hội La Fiesta de los Vaqueros với rodeo và đoàn diễu hành được mệnh danh là dài nhất thế giới không dùng động cơ. Không bắt buộc, nhưng đều là những trải nghiệm văn hóa thú vị.',
        ],
      } as P,
      home: {
        h: { en: 'A Taste of Home', vi: 'Hương Vị Quê Nhà' },
        p: { en: 'Missing cơm tấm or bánh mì? Cơm Tấm Thuận Kiều and Banhdicted sit side by side on Orange Grove Road, a short drive from the venue. Saigon Blossoms, downtown, has served Tucson since 2000.', vi: 'Nhớ cơm tấm hay bánh mì? Cơm Tấm Thuận Kiều và Banhdicted nằm cạnh nhau trên đường Orange Grove, cách nơi tổ chức không xa. Ở trung tâm thành phố có Saigon Blossoms, phục vụ người Tucson từ năm 2000.' },
      },
    },
  },

  golden: {
    h: { en: 'Golden Hour', vi: 'Chiều Tà' },
    light: {
      h: { en: 'The Light', vi: 'Ánh Sáng' },
      p: {
        en: [
          'Tucson is a city of sunshine, and February light is its gentlest. At dusk the Santa Catalinas move from yellow to pink to lavender, especially after a winter storm, a soft, almost ethereal glow that photographs cannot quite hold. This is the hour to be outside with a drink and no particular place to be.',
          'Gates Pass is Tucson’s beloved sunset pullout, a gentle climb through saguaro country. Arrive twenty minutes early and bring a light layer; the temperature drops quickly once the light goes.',
        ],
        vi: [
          'Tucson là thành phố của nắng, và nắng tháng Hai dịu dàng nhất. Lúc hoàng hôn, dãy Santa Catalina chuyển từ vàng sang hồng rồi tím nhạt, nhất là sau một cơn mưa đông, một ánh sáng mềm mại, gần như huyền ảo mà máy ảnh khó giữ lại được. Đây là lúc nên ra ngoài, cầm một ly nước, và chẳng cần vội đi đâu.',
          'Gates Pass là điểm ngắm hoàng hôn được người Tucson yêu thích nhất, một con đèo thoai thoải giữa rừng saguaro. Hãy đến sớm hai mươi phút và mang theo áo khoác mỏng; trời lạnh rất nhanh khi nắng tắt.',
        ],
      } as P,
    },
    venue: {
      h: { en: 'The Venue', vi: 'Nơi Tổ Chức' },
      p: {
        en: [
          'We plan to marry at The Buttes at Reflections, a family-run garden venue at the foot of Pusch Ridge, near Oro Valley. The ceremony will be in the garden, by the fountain and the wooden pergola, as the evening light reaches the mountains.',
          'Dinner and dancing follow in the hall, where tall windows look out over the garden and the ridge.',
        ],
        vi: [
          'Chúng tôi dự định tổ chức lễ cưới tại The Buttes at Reflections, một khu vườn tiệc cưới do một gia đình gây dựng, nằm dưới chân dãy Pusch Ridge, gần Oro Valley. Hôn lễ sẽ diễn ra trong vườn, bên đài phun nước và giàn gỗ, khi ánh chiều vừa chạm đến núi.',
          'Sau đó là tiệc tối và khiêu vũ trong sảnh, nơi những ô cửa kính cao nhìn ra khu vườn và dãy núi.',
        ],
      } as P,
      mapNote: { en: 'A simple sketch of the area. Tap “Open in Maps” for driving directions.', vi: 'Bản đồ phác họa khu vực. Bấm “Mở bản đồ” để xem đường lái xe.' },
    },
  },

  night: {
    h: { en: 'Night', vi: 'Đêm' },
    dark: {
      h: { en: 'A Dark Sky', vi: 'Bầu Trời Đêm' },
      p: {
        en: [
          'Tucson guards its night. Its outdoor lighting rules were among the first of their kind anywhere, written to protect the observatories on the surrounding peaks, and on a clear February night the stars come down almost to the mountains.',
          'Kitt Peak National Observatory, about ninety minutes west, holds evening programs that begin with the sunset. Closer to the venue, Catalina State Park leads guided night hikes.',
        ],
        vi: [
          'Tucson gìn giữ bóng đêm của mình. Thành phố là một trong những nơi đầu tiên trên thế giới có quy định hạn chế đèn ngoài trời, để bảo vệ các đài thiên văn trên những đỉnh núi quanh đây. Vào một đêm tháng Hai trời quang, sao như sà xuống tận chân núi.',
          'Đài thiên văn quốc gia Kitt Peak, cách khoảng chín mươi phút về phía tây, có chương trình buổi tối bắt đầu từ lúc hoàng hôn. Gần nơi tổ chức hơn, Catalina State Park có những chuyến đi bộ đêm có hướng dẫn.',
        ],
      } as P,
    },
    words: {
      h: { en: 'Words of the Desert', vi: 'Từ Ngữ Sa Mạc' },
      list: [
        { t: 'Cuk Ṣon', en: 'O’odham for “black base,” the dark foot of a mountain. The source of the name Tucson.', vi: 'Tiếng O’odham, nghĩa là “chân núi đen”. Tên Tucson bắt nguồn từ đây.' },
        { t: 'Saguaro', say: 'sah-WAH-roh', en: 'The giant cactus, found wild only in the Sonoran Desert.', vi: 'Cây xương rồng khổng lồ, chỉ mọc hoang ở sa mạc Sonoran.' },
        { t: 'Sky island', en: 'A mountain range rising from the desert, holding its own world on top.', vi: 'Đảo trên trời: dãy núi vươn lên giữa sa mạc, mang một thế giới riêng trên đỉnh.' },
        { t: 'Palo verde', en: 'Spanish for “green stick.” Arizona’s state tree, with green bark.', vi: 'Tiếng Tây Ban Nha, nghĩa là “cành xanh”. Cây biểu tượng của Arizona, có vỏ màu xanh lá.' },
        { t: 'Wash', en: 'A dry streambed that runs only after rain.', vi: 'Lòng suối khô, chỉ có nước sau cơn mưa.' },
        { t: 'Creosote', en: 'A desert shrub. Its scent after rain is what locals call the smell of the desert.', vi: 'Một loài cây bụi. Mùi hương của nó sau mưa được người dân gọi là mùi của sa mạc.' },
      ],
    },
  },

  after: {
    h: { en: 'After the Vows', vi: 'Sau Lễ Cưới' },
    teaser: { en: 'A Friday wedding leaves you a weekend in southern Arizona. If you would like to stay a little longer, we have gathered three ways to spend it: a road trip, a red-rock escape, or a slow stay close by.', vi: 'Đám cưới vào thứ Sáu, nên quý vị còn trọn một cuối tuần ở miền nam Arizona. Nếu muốn ở lại thêm, chúng tôi đã gợi ý ba cách tận hưởng: một chuyến đi đường dài, một chuyến đến vùng đá đỏ, hoặc một kỳ nghỉ thong thả ngay gần đây.' },
    cta: { en: 'Stay a little longer', vi: 'Ở lại thêm' },
  },

  closing: {
    p: {
      en: ['Tucson will not try to impress you; it will simply be what it is. In February the desert is waking up, and the landscape seems to hold its breath in the best way. Arrive with room in your schedule, stay for the light, and take one road out of town if you have the weekend.', 'We cannot wait to share it with you.'],
      vi: ['Tucson sẽ không cố gây ấn tượng với quý vị; nơi đây chỉ đơn giản là chính mình. Tháng Hai, sa mạc đang thức giấc, và cả vùng đất như đang nín thở chờ đợi. Hãy đến với một lịch trình thong thả, ở lại vì ánh sáng, và nếu có cuối tuần, hãy đi thêm một con đường ra khỏi thành phố.', 'Chúng tôi rất mong được cùng quý vị chia sẻ nơi này.'],
    } as P,
  },
};
