ip.addresses.ranges <- read.csv('data/partial.csv', header=FALSE, stringsAsFactors=F, sep=",", quote="\"", na.strings="")

ip.addresses.ranges.transformed <- ip.addresses.ranges[,c(1,2,4)]

write.csv(ip.addresses.ranges.transformed[1:5,], file="partial.transformed.test.csv", row.names=FALSE, quote=FALSE)
write.csv(ip.addresses.ranges.transformed, file="partial.transformed.csv", row.names=FALSE, quote=FALSE)