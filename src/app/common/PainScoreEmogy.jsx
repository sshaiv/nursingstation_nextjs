import { H3, Label } from "./text";


export default function PainScoreEmogy() {


  return (
    <div className="flex flex-col items-center gap-2 mb-6">
        <H3>Pain Assessment Scale</H3>
        <div className="overflow-x-auto w-full">
          <div className="flex justify-between gap-4 px-2 min-w-[800px]">
            {[
              { score: 0, emoji: "😄", Label: "No Pain" },
              { score: 1, emoji: "😀", Label: "Just Noticeable" },
              { score: 2, emoji: "🙂", Label: "Mild Pain" },
              { score: 3, emoji: "😐", Label: "Uncomfortable Pain" },
              { score: 4, emoji: "😑", Label: "Annoying Pain" },
              { score: 5, emoji: "😣", Label: "Moderate Pain" },
              { score: 6, emoji: "😖", Label: "Just Bearable" },
              { score: 7, emoji: "😫", Label: "Strong Pain" },
              { score: 8, emoji: "😩", Label: "Severe Pain" },
              { score: 9, emoji: "😠", Label: "Horrible Pain" },
              { score: 10, emoji: "😵", Label: "Worst Pain" },
            ].map((item) => (
              <div
                key={item.score}
                className="flex flex-col items-center w-20 text-center"
              >
                <Label>{item.score}</Label>
                <Label className="text-2xl">{item.emoji}</Label>
                <Label>{item.Label}</Label>
              
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
