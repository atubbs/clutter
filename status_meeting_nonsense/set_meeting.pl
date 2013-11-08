#!/usr/bin/perl

# if you've got a meeting and you're not sure where to start or which
# direction to go, this will help!

use warnings;
use strict;

# all fun and games until somebody complains the PRNG 
# seed is time(0)
use Crypt::OpenSSL::Random;

# the only thing worse than blocking entropy is blocking a meeting
Crypt::OpenSSL::Random::random_egd("/dev/urandom");
Crypt::OpenSSL::Random::random_status() or die "entropy lacking, committing suicide";

# read in a list of names
my @raw = <>;
map chomp, @raw;
my @names = grep { /\S/ } @raw;
die "feed me a list of names via stdin and try again" unless @names;
my $start = $names[unpack("C8", Crypt::OpenSSL::Random::random_bytes(8)) % @names];
my $direction = unpack("C1", Crypt::OpenSSL::Random::random_bytes(1)) % 2 ? "clockwise" : "anti-clockwise";
print "Start with $start and proceed $direction\n";
