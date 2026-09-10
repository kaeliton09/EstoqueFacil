// src/screens/DashboardScreen.tsx

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

import { StatCard } from '../components/StatCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { radius, spacing } from '../theme/spacing';

const chartData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  datasets: [
    {
      data: [12, 25, 58, 45, 82],
      color: () => colors.chartDark,
      strokeWidth: 2,
    },
    {
      data: [18, 20, 27, 40, 42],
      color: () => colors.chartMedium,
      strokeWidth: 2,
    },
    {
      data: [30, 46, 85, 85, 124],
      color: () => colors.chartLight,
      strokeWidth: 2,
    },
  ],
};

const chartLegend = [
  {
    label: 'Computador',
    color: colors.chartDark,
  },
  {
    label: 'Dispositivo móvel',
    color: colors.chartMedium,
  },
  {
    label: 'Tablet',
    color: colors.chartLight,
  },
];

export function DashboardScreen() {
  const { width } = useWindowDimensions();

  const horizontalPadding = spacing.xl * 2;
  const availableWidth = width - horizontalPadding;
  const isSmallScreen = width < 390;

  const chartWidth = Math.max(availableWidth, 300);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>

          <View style={styles.profileButton}>
            <Ionicons
              name="person"
              size={38}
              color={colors.white}
            />
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            value="4000"
            label="itens cadastrados"
            backgroundColor={colors.black}
            style={[
              styles.halfCard,
              isSmallScreen && styles.smallHalfCard,
            ]}
          />

          <StatCard
            value="12"
            label="itens abaixo do mínimo"
            backgroundColor={colors.primary}
            style={[
              styles.halfCard,
              isSmallScreen && styles.smallHalfCard,
            ]}
          />

          <StatCard
            value="R$ 45.320,00"
            label="valor do estoque"
            backgroundColor={colors.primary}
            valueSize={isSmallScreen ? 34 : 42}
            style={styles.fullCard}
          />
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>
            Movimentação do estoque
          </Text>

          <View style={styles.legend}>
            {chartLegend.map((item) => (
              <View
                key={item.label}
                style={styles.legendItem}
              >
                <View
                  style={[
                    styles.legendDot,
                    {
                      backgroundColor: item.color,
                    },
                  ]}
                />

                <Text style={styles.legendText}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={280}
              yAxisSuffix=""
              yAxisInterval={1}
              fromZero
              segments={7}
              bezier
              withDots
              withShadow
              withInnerLines
              withOuterLines={false}
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,

                decimalPlaces: 0,

                color: () => colors.chartMedium,
                labelColor: () => colors.text,

                propsForBackgroundLines: {
                  stroke: '#D8D8D8',
                  strokeWidth: 1,
                },

                propsForLabels: {
                  fontFamily: typography.fontFamily.regular,
                  fontSize: 12,
                },

                fillShadowGradient: colors.chartLight,
                fillShadowGradientOpacity: 0.25,

                useShadowColorFromDataset: true,
              }}
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.huge,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },

  title: {
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.title,
    lineHeight: 48,
  },

  profileButton: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },

  halfCard: {
    flexGrow: 1,
    flexBasis: '45%',
    minHeight: 155,
  },

  smallHalfCard: {
    flexBasis: '100%',
  },

  fullCard: {
    width: '100%',
    minHeight: 150,
    alignItems: 'center',
  },

  chartSection: {
    width: '100%',
    marginTop: spacing.xxxl,
    backgroundColor: colors.white,
    borderRadius: radius.xxl,
    paddingVertical: spacing.xl,
    overflow: 'hidden',
  },

  sectionTitle: {
    color: colors.primary,
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },

  legend: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    width: 13,
    height: 13,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },

  legendText: {
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },

  chartContainer: {
    width: '100%',
    alignItems: 'center',
  },

  chart: {
    marginLeft: -10,
    paddingRight: spacing.lg,
    borderRadius: radius.lg,
  },
});