# Experiment Matrix

These experiments come directly from `Low Latency.docx`.

## Segment Duration Experiment

| keyint | seg_duration |
| ------ | ------------ |
| 30     | 1            |
| 60     | 2            |
| 90     | 3            |
| 120    | 4            |
| 150    | 5            |
| 180    | 6            |

## Fragment Duration Experiment

Fixed values: `keyint=120`, `seg_duration=4`.

| keyint | seg_duration | frag_duration |
| ------ | ------------ | ------------- |
| 120    | 4            | 0.033         |
| 120    | 4            | 0.066         |
| 120    | 4            | 0.1           |
| 120    | 4            | 0.2           |
| 120    | 4            | 0.5           |
| 120    | 4            | 1             |
| 120    | 4            | 2             |
| 120    | 4            | 4             |
