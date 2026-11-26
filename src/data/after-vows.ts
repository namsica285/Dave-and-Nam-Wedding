// After the Vows / Sau Lễ Cưới: the optional weekend ideas from Nam's draft, lightly edited.
// Vietnamese is a first draft for Nam to review. Facts checked Nov 2026 (Chiricahua became a national park in Oct 2026).
type T = { en: string; vi: string };
type Stop = { name: string; en: string; vi: string };

export const after = {
  title: { en: 'After the Vows', vi: 'Sau Lễ Cưới' },
  lede: {
    en: 'A Friday wedding leaves you a weekend in southern Arizona with no fixed itinerary. Choose a tempo rather than a checklist: the road trip, the red-rock escape, or the stay-close ranch. Each assumes the best part of the trip is the road itself.',
    vi: 'Đám cưới vào thứ Sáu, nên quý vị còn trọn một cuối tuần ở miền nam Arizona, không cần lịch trình cố định. Hãy chọn một nhịp điệu thay vì một danh sách: chuyến đi đường dài, chuyến đến vùng đá đỏ, hoặc kỳ nghỉ thong thả ở trang trại gần đây. Cả ba đều tin rằng phần đẹp nhất của chuyến đi chính là con đường.',
  } as T,
  tempos: [
    {
      id: 'loop',
      h: { en: 'The Sky Islands Loop', vi: 'Vòng Quanh Những Đảo Trên Trời' },
      meta: { en: 'Two or three days · about 350 miles · no leg longer than about 2 hours', vi: 'Hai hoặc ba ngày · khoảng 560 km · mỗi chặng không quá 2 tiếng' },
      intro: { en: 'This loop southeast of Tucson runs through wine country, a birding town, the old West, a copper town and a forest of stone. Spread it over two or three days and stop often.', vi: 'Vòng đường này ở phía đông nam Tucson đi qua vùng rượu vang, một thị trấn ngắm chim, miền Tây xưa, một thị trấn mỏ đồng và một khu rừng đá. Hãy đi trong hai hoặc ba ngày và dừng lại thường xuyên.' } as T,
      stops: [
        { name: 'Sonoita & Elgin', en: 'Near 5,000 feet, desert becomes grassland and vineyards. Callaghan and Los Milics are among the most respected tasting rooms, and February is quiet enough to talk with the people who make the wine. This is not Napa; it is more intimate and unpretentious.', vi: 'Ở độ cao gần 1.500 mét, sa mạc nhường chỗ cho đồng cỏ và vườn nho. Callaghan và Los Milics là hai phòng thử rượu được đánh giá cao, và tháng Hai đủ vắng để quý vị trò chuyện với chính những người làm rượu. Không phải Napa, nhưng gần gũi và mộc mạc hơn.' },
        { name: 'Patagonia', en: 'A small town with an outsized birding reputation. The Patagonia-Sonoita Creek Preserve is one of the best birding spots in the country, and February brings winter residents and early migrants. You do not need to be a birder to love standing still there.', vi: 'Một thị trấn nhỏ nhưng nổi tiếng về ngắm chim. Khu bảo tồn Patagonia-Sonoita Creek là một trong những nơi ngắm chim đẹp nhất nước Mỹ, và tháng Hai có cả chim trú đông lẫn những đàn chim di cư sớm. Không cần mê chim, quý vị vẫn sẽ thích đứng lặng ở đó.' },
        { name: 'Tombstone', en: 'The old West with a wink. Allen Street is preserved for walking and the famous gunfight is reenacted daily. Go in the morning, when the light is soft and the crowds are thin, and treat it as living theater rather than a history lesson.', vi: 'Miền Tây xưa với chút hài hước. Phố Allen được giữ nguyên cho người đi bộ, và trận đấu súng nổi tiếng được diễn lại mỗi ngày. Hãy đến vào buổi sáng khi nắng còn dịu và vắng người, và xem đó như một sân khấu sống hơn là một bài học lịch sử.' },
        { name: 'Bisbee', en: 'A former copper town built into the Mule Mountains, now a warren of staircases, galleries and coffee shops. Take the Queen Mine Tour, guided by retired miners, then stay overnight if you can. Brewery Gulch in the evening is a different town entirely.', vi: 'Thị trấn mỏ đồng xưa nép mình trong dãy Mule, nay là mê cung của những bậc thang, phòng tranh và quán cà phê. Hãy đi tour mỏ Queen Mine do chính những thợ mỏ đã nghỉ hưu dẫn đường, rồi ở lại qua đêm nếu được. Buổi tối ở Brewery Gulch là một thị trấn hoàn toàn khác.' },
        { name: 'Chiricahua National Park', en: 'The quiet climax: volcanic rock spires best seen on foot. The Heart of Rocks Loop is the signature moderate hike, and February temperatures are close to ideal. Even the drive to Massai Point rearranges your sense of what a desert can be.', vi: 'Điểm kết lặng lẽ: những cột đá núi lửa đẹp nhất khi đi bộ. Đường mòn Heart of Rocks Loop là cung đường đặc trưng, độ khó vừa phải, và nhiệt độ tháng Hai gần như lý tưởng. Chỉ riêng đoạn đường lên Massai Point cũng đủ thay đổi cách quý vị nghĩ về sa mạc.' },
      ] as Stop[],
      close: { en: 'Do not do this loop in one day. Spend the night in Bisbee or Patagonia, eat dinner somewhere local, and let the weekend breathe. The point is to stop, not to cover ground.', vi: 'Đừng đi hết vòng này trong một ngày. Hãy nghỉ đêm ở Bisbee hoặc Patagonia, ăn tối ở một quán địa phương, và để cuối tuần được thong thả. Điều quan trọng là dừng lại, không phải đi cho xa.' } as T,
    },
    {
      id: 'red-rock',
      h: { en: 'Red Rock Country', vi: 'Vùng Đá Đỏ' },
      meta: { en: 'Two nights · Sedona, about 3½ to 4 hours north', vi: 'Hai đêm · Sedona, khoảng 3 tiếng rưỡi đến 4 tiếng về phía bắc' },
      intro: { en: 'February is one of the most rewarding months to arrive in Sedona. Summer crowds are gone, trails are quiet, and the red rocks often carry a dusting of snow. Days reach about 61°F (16°C), with nights near freezing.', vi: 'Tháng Hai là một trong những tháng đẹp nhất để đến Sedona. Khách du lịch mùa hè đã về, đường mòn yên tĩnh, và những khối đá đỏ thường phủ một lớp tuyết mỏng. Ban ngày khoảng 16°C (61°F), ban đêm gần 0°C.' } as T,
      body: {
        en: [
          'Cathedral Rock is a short, steep climb to a saddle view that feels almost architectural. West Fork Trail in Oak Creek Canyon is a gentler walk along the creek, silent in a way it never is in summer. If the weather turns, the galleries and spas are a fine consolation.',
          'The drive north passes through saguaro, chaparral, juniper and pine, a slow reveal. With a third day, Flagstaff is about an hour further north at 7,000 feet, with pine forest and a walkable historic downtown. Book two nights in Sedona and pick one hike per day.',
        ],
        vi: [
          'Cathedral Rock là một đoạn leo ngắn nhưng dốc, dẫn lên một yên núi với khung cảnh như một công trình kiến trúc. Đường mòn West Fork trong hẻm Oak Creek nhẹ nhàng hơn, men theo con suối, tĩnh lặng như chưa bao giờ có vào mùa hè. Nếu trời xấu, các phòng tranh và spa cũng là một lựa chọn dễ chịu.',
          'Đường lên phía bắc đi qua rừng saguaro, cây bụi, bách xù rồi rừng thông, như một bức màn từ từ hé mở. Nếu có thêm ngày thứ ba, Flagstaff cách thêm khoảng một tiếng về phía bắc, ở độ cao hơn 2.100 mét, với rừng thông và khu phố cổ dễ đi bộ. Hãy đặt hai đêm ở Sedona và chọn mỗi ngày một cung đường.',
        ],
      },
    },
    {
      id: 'ranch',
      h: { en: 'The Ranch, and the Caverns', vi: 'Trang Trại và Hang Động' },
      meta: { en: 'Stay close · Kartchner Caverns, about an hour southeast', vi: 'Ở gần · hang Kartchner, khoảng một tiếng về phía đông nam' },
      intro: { en: 'Not every weekend needs a road trip; sometimes the elegant response is to stay close and move slowly. Tanque Verde Ranch, Hacienda del Sol and White Stallion Ranch offer riding, hiking, mountain views and wide-open silence. This is the most restful version of the weekend.', vi: 'Không phải cuối tuần nào cũng cần một chuyến đi xa; đôi khi cách tận hưởng tinh tế nhất là ở gần và đi thật chậm. Tanque Verde Ranch, Hacienda del Sol và White Stallion Ranch có cưỡi ngựa, đi bộ đường dài, cảnh núi và một sự tĩnh lặng mênh mông. Đây là phiên bản thư thái nhất của cuối tuần.' } as T,
      body: {
        en: [
          'Kartchner Caverns, near Benson, is the one excursion worth making. The Big Room opens only from October 15 to April 15, while the bats that summer there are away, and February tours fill quickly, so reserve ahead. The cave is a cool, dark counterpoint to the desert sun.',
        ],
        vi: [
          'Hang Kartchner, gần thị trấn Benson, là chuyến đi đáng giá nhất. Hang Big Room chỉ mở cửa từ ngày 15 tháng 10 đến 15 tháng 4, khi đàn dơi sống ở đó vào mùa hè đã rời đi, và tour tháng Hai kín chỗ rất nhanh, nên hãy đặt trước. Hang động mát và tối, đối lập hẳn với nắng sa mạc.',
        ],
      },
    },
  ],
  back: { en: 'Back to Destination', vi: 'Quay lại Điểm Đến' },
};
